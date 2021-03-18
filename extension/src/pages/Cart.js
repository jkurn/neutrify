import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


const CartContainer = styled.div`
  position: absolute;
  margin-top:80px;;
`;

const ImageContainer = styled.img`
  margin-left: 15px;
`;

const CartItem = styled.div`
  border-radius: 5px 5px 0px 0px;
  background: #F4F7FB;
  border: 2px solid #ECECEC;
  border-bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  width: 295px;
`;

const ItemName = styled.div`
  font-size: 11px;
  margin: 5px 5px 5px 6px;
  font-weight: 500;
`;

const ItemDesc = styled.div`
  font-size: 8px;
  margin: 6px 5px 5px 1px;
`;

const PerServing = styled.div`
  font-size: 9px;
  margin: 6px 5px 5px 5px;
  color: gray;
`;

const CartItemGHG = styled.div`
  border-radius: 0px 0px 5px 5px;
  background: #F4F7FB;
  border: 2px solid #ECECEC;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  width: 295px;
`;

const ItemGHG = styled.div`
  color: #7492B6;
  font-weight: 550;
  font-size: 15px;
  margin: 4px 5px 5px 10px;
`;

const OfCO2Expr = styled.div`
  font-weight: 550;
  font-size: 15px;
  margin: 4px 5px 5px 0px;
`;

const ProducedExpr = styled.div`
  font-weight: 550;
  font-size: 12px;
  margin: 7px 5px 5px 1px;
`;

const TotalContainer = styled.div`
  background: #ECECEC;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 8px;
  height: 80px;
`;

const AltContainer = styled.div`
  border-radius: 5px;
  background: #F4F7FB;
  border: 2px solid #86BDA6;
  border-collapse: separate;
  border-spacing: 15px;
  margin: 5px 10px 5px 10px;
  height: 34px;
`;

const AltItem = styled.div`
  margin: 5px 5px 5px 10px;
  font-size: 13px;
  font-weight: 500;
`;

const AltItemDesc = styled.div`
  font-size: 10px;
  margin: 8px 5px 5px 1px;
`;

const AddToCartButton = styled.button`
  background-color: #26BD58;
  border-radius: 3px;
  position: absolute;
  right: 0;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 8px;
  font-weight: 550;
  margin-top: 5px;
  margin-right: 19px;
  width: 90px;
  height: 20px;
`;

function Cart() {
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
      })
      .catch((err) => console.log(err));
  }, []);

  // check Cart
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      browser.runtime
        .sendMessage("getCartDetails")
        .then(({ response }) => {
          console.log(response);
          setRawCart(response);
          console.log(rawCart);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log("RawCart", rawCart);
    if (rawCart && rawCart.length > 0) {
      console.log("i am in");
      let promises = [];
      let finalCart = [];

      rawCart.map((rawCartItem) => {
        let cartItemWithGHGPromise = new Promise(async (resolve, reject) => {
          try {
            let rawCartItemId = await rawCartItem.id.split("_")[1];
            let finalCartItem = (
              await axios.get(`http://localhost:5000/api/mock/product/${rawCartItemId}`)
            ).data;

            setTotalGHG(totalGHG + finalCartItem.C02 * rawCartItem.quantity);

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
      });
    }
  }, [rawCart]);

  if (isLoggedIn === false) {
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
                break;
              default:
                break;
            }
          })}
        </CartSection>

        <TotalContainer>
          <div className="flex">
            <h1 className="text-2xs text-gray-500 font-semibold m-1">TOTAL PURCHASE EMISSIONS</h1>
            <div><a href="#" className="text-n-black text-3xs text-xs font-medium underline ml-12">SHOW BREAKDOWN</a></div>
          </div>

          <div className="flex align-center mt-4 ml-5">
            <img src="/images/c02.svg" alt="CO2 Logo" />
            <ItemGHG>{totalGHG}kg</ItemGHG>
            <OfCO2Expr>of CO2</OfCO2Expr>
            <ProducedExpr>produced</ProducedExpr>
          </div>
        </TotalContainer>

        <h1 className="text-2xs font-semibold ml-2 text-n-green">SUGGESTED ALTERNATIVES</h1>
        <div className="flex">
          <img src="/images/c02.svg" alt="CO2" className="-mt-3 ml-2"/>
          <h1 className="text-sm font-medium ml-1 mb-4 text-n-aquablue">124 shoppers have shopped carbon</h1>
        </div>
        <h1 className="text-sm font-medium -mt-4 ml-2 mb-1 text-n-aquablue">conscious!</h1>
        <AltContainer className="flex">
          <ImageContainer src="/images/fish.svg" alt="fish" />
          <AltItem>Salmon</AltItem>
          <AltItemDesc>(Local)</AltItemDesc>
          <AddToCartButton>ADD TO CART</AddToCartButton>
        </AltContainer>

        <AltContainer className="flex">
          <ImageContainer src="/images/vegetable.svg" alt="vegetable"/>
          <AltItem>Beyond Meat</AltItem>
          <AddToCartButton>ADD TO CART</AddToCartButton>
        </AltContainer>

    </CartContainer>

  );
}

export default Cart;
