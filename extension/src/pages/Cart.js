import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AltItem from "../components/Cart/AltItem";
import CartItem from "../components/Cart/CartItem";

const CartSection = styled.div`
  padding: 10px;
  width: 100%;
`;

const ItemGHG = styled.div`
  color: #7492b6;
  font-weight: 550;
  font-size: 15px;
  margin-left: 10px;
`;

const OfCO2Expr = styled.div`
  font-weight: 550;
  font-size: 15px;
  margin-left: 5px;
`;

const ProducedExpr = styled.div`
  font-weight: 550;
  font-size: 12px;
  margin-left: 5px;
`;

const TotalContainer = styled.div`
  background: #ececec;
  padding: 10px;
  padding-bottom: 17px;
  margin: 10px 0;
`;

const ShowBreakdown = styled.a`
  color: #192642;
`;

function Cart() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rawCart, setRawCart] = useState([]);
  const [cartWithGHG, setCartWithGHG] = useState([]);
  const [totalGHG, setTotalGHG] = useState(0);

  // check Login
  useEffect(() => {
    browser.runtime
      .sendMessage("checkLogin")
      .then(({ response }) => {
        console.log(response);
        setIsLoggedIn(response);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // check Cart
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      setLoading(true);
      browser.runtime
        .sendMessage("getCartDetails")
        .then(({ response }) => {
          setRawCart(response);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log("RawCart", rawCart);
    if (rawCart && rawCart.length > 0) {
      setLoading(true);
      let promises = [];
      let finalCart = [];

      rawCart.forEach((rawCartItem) => {
        let cartItemWithGHGPromise = new Promise(async (resolve, reject) => {
          try {
            let rawCartItemId = await rawCartItem.id.split("_")[1];
            let finalCartItem = (
              await axios.get(`http://localhost:5000/api/mock/product/${rawCartItemId}`)
            ).data;

            let newTotalGHG = finalCartItem.C02 * rawCartItem.quantity;
            setTotalGHG(totalGHG + newTotalGHG);

            if (finalCartItem.data !== "") {
              await finalCart.push({ ...rawCartItem, ...finalCartItem });
            }
          } catch (err) {
            console.log(err);
            reject(err);
          }
          await resolve("success");
        });

        promises.push(cartItemWithGHGPromise);
      });

      Promise.all(promises).then(() => {
        console.log("Final Cart", finalCart);
        setCartWithGHG(finalCart);
        setLoading(false);
      });
    }
  }, [rawCart]);

  if (loading === true) {
    return (
      <div className="flex justify-center">
        <img src="/images/loading.svg" className="w-8 animate-spin" />
      </div>
    );
  } else if (isLoggedIn === false) {
    return <h1 className="w-6/12 text-center mx-auto">Please make sure you are logged in</h1>;
  } else if (!rawCart || (rawCart && rawCart.length === 0)) {
    return (
      <h1 className="w-6/12 text-center mx-auto">
        Please make sure you have added something into your cart
      </h1>
    );
  } else if (cartWithGHG && rawCart.length > 0) {
    return (
      <div className="flex w-full flex-col">
        <CartSection>
          <h1 className="text-xs font-semibold text-gray-500 mb-2">BASED ON YOUR CART TODAY</h1>
          {cartWithGHG.map((cartItem) => {
            switch (cartItem.type) {
              case "Beef":
                console.log(cartItem);
                return (
                  <CartItem
                    imageURL="/images/beef.svg"
                    title={cartItem.title}
                    description="Natural Choice"
                    serving={cartItem.size}
                    ghg={cartItem.C02}
                  />
                );
              default:
                return null;
            }
          })}
        </CartSection>

        <TotalContainer>
          <div className="flex items-center justify-between">
            <h1 className="text-2xs text-gray-500 font-semibold">TOTAL PURCHASE EMISSIONS</h1>
            <ShowBreakdown href="#" className="text-3xs text-xs font-semibold underline ml-12">
              SHOW BREAKDOWN
            </ShowBreakdown>
          </div>

          <div className="flex align-center mt-4 ml-5">
            <img src="/images/c02.svg" alt="CO2 Logo" />
            <ItemGHG>{totalGHG}kg</ItemGHG>
            <OfCO2Expr>of CO2</OfCO2Expr>
            <ProducedExpr className="self-end">produced</ProducedExpr>
          </div>
        </TotalContainer>

        <CartSection>
          <h1 className="text-2xs font-semibold text-n-green mb-1">SUGGESTED ALTERNATIVES</h1>
          <h1 className="text-xs font-semibold ml-1 mb-4 text-n-aquablue">
            <img src="/images/star.svg" alt="Star" className="mb-1 mr-1 inline-flex items-center" />
            124 shoppers have shopped carbon conscious!
          </h1>
          <AltItem imageURL="/images/fish.svg" title="Salmon" description="Local" />
          <AltItem imageURL="/images/vegetable.svg" title="Beyond Meat" />
        </CartSection>
      </div>
    );
  }
}

export default Cart;
