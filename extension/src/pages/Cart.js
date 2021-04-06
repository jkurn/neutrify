import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AltItem from "../components/Cart/AltItem";
import CartItem from "../components/Cart/CartItem";
import { Transition } from "@headlessui/react";
import { API_ENDPOINT } from "../config.js/global";

const CartSection = styled.div`
  padding: 10px;
  width: 100%;
`;

const ItemGHG = styled.div`
  color: #7492b6;
  font-weight: 550;
  font-size: 11.7px;
  margin-left: 10px;
`;

const OfCO2Expr = styled.div`
  font-weight: 550;
  font-size: 11.7px;
  margin-left: 5px;
`;

const ProducedExpr = styled.div`
  font-weight: 550;
  font-size: 7.15px;
  margin-left: 5px;
  margin-bottom: 3px;
`;

const TotalContainer = styled.div`
  background: #F9F9FA;
  padding: 10px;
  padding-bottom: 17px;
  margin: 10px 0;
`;

const ShowBreakdown = styled.a`
  color: #192642;
  font-size: 6px;
`;

const BasedOnCart = styled.a`
  font-size: 7.377px;
`;

function Cart() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rawCart, setRawCart] = useState([]);
  const [cartWithGHG, setCartWithGHG] = useState([]);
  const [totalGHG, setTotalGHG] = useState(0);

  // Check if user is logged in
  useEffect(() => {
    // Send message to background script to check cookies
    browser.runtime
      .sendMessage({ action: "background_checkLogin" })
      .then(({ response }) => {
        console.log(response);
        setIsLoggedIn(response);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Get cart details of the user if they are logged in
  useEffect(() => {
    if (isLoggedIn === true) {
      // Send message to background script to get cart details
      setLoading(true);
      browser.runtime
        .sendMessage({ action: "background_getCartDetails" })
        .then(({ response }) => {
          setRawCart(response);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  // Match each cart item with db to get GHG
  useEffect(() => {
    console.log("RawCart", rawCart);
    if (rawCart && rawCart.length > 0) {
      setLoading(true);
      setTotalGHG(0);
      setCartWithGHG([]);

      browser.runtime
        .sendMessage({ action: "background_getProductsWithCarbon", data: { rawCart } })
        .then(({response}) => {
          console.log(response);
          setCartWithGHG(response.finalCart);
          console.log(cartWithGHG);
          setTotalGHG(response.totalGHG);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [rawCart]);

  useEffect(() => {
    browser.runtime.onMessage.addListener((request) => {
      let action = request.action.split("components_")[1];

      switch (action) {
        case "updateCart":
          setLoading(true);
          setRawCart(request.response);
          break;
        default:
          break;
      }
    });
  }, []);

  // Four possible scenarios
  // 1. Loading
  // 2. User is not logged in
  // 3. User has nothing in the cart
  // 4. User is logged in & has items in the cart

  // 1. Loading
  if (loading === true) {
    return (
      <div className="flex justify-center flex-1 overflow-hidden">
        <img src="/images/loading.svg" className="w-8 animate-spin" />
      </div>
    );
  }
  // 2. User is not logged in
  else if (isLoggedIn === false) {
    return <h1 className="w-6/12 text-center mx-auto">Please make sure you are logged in</h1>;
  }
  // 3. User has nothing in the cart
  else if (!rawCart || (rawCart && rawCart.length === 0)) {
    return (
      <h1 className="w-6/12 text-center mx-auto">
        Please make sure you have added something into your cart
      </h1>
    );
  }
  // 4. User is logged in & has items in the cart
  else if (cartWithGHG && cartWithGHG.length > 0) {
    return (
      <Transition
        show={true}
        enter="transition duration-300 ease-out"
        enterFrom="opacity-0 transform -translate-x-4"
        enterTo="opacity-100 transform translate-x-0"
        leave="transition duration-300 ease-out"
        leaveFrom="opacity-100 transform translate-x-0"
        leaveTo="opacity-0 transform -translate-x-4"
        className="flex w-full flex-col overflow-y-auto overflow-x-hidden flex-1"
        as="div"
      >
        <CartSection>
          <BasedOnCart className="font-semibold text-n-lightGrey mb-2">BASED ON YOUR CART TODAY</BasedOnCart>
          {cartWithGHG.map((cartItem) => (
            <CartItem
              imageURL="/images/beef.svg"
              title={cartItem.name}
              description="Natural Choice"
              serving="1 kg"
              ghg={cartItem.carbon}
            />
          ))}
        </CartSection>

        <TotalContainer>
          <div className="flex items-center justify-between">
            <h1 className="text-2.4xs text-n-lightGrey font-semibold">TOTAL PURCHASE EMISSIONS</h1>
            <ShowBreakdown href="#" className="font-semibold underline ml-5">
              SHOW BREAKDOWN
            </ShowBreakdown>
          </div>

          <div className="flex align-center mt-4 ml-5">
            <img src="/images/c02.svg" alt="CO2 Logo" width="16.82"/>
            <ItemGHG>{totalGHG}kg</ItemGHG>
            <OfCO2Expr>of CO2</OfCO2Expr>
            <ProducedExpr className="self-end">produced</ProducedExpr>
          </div>
        </TotalContainer>

        <CartSection>
          <h1 className="text-2.4xs font-semibold text-n-green mb-1">SUGGESTED ALTERNATIVES</h1>
          <h1 className="text-2xs font-semibold ml-1 mb-4 text-n-aquablue">
            <img src="/images/star.svg" alt="Star" className="mb-1 mr-1 inline-flex items-center" />
            124 shoppers have shopped carbon conscious!
          </h1>
          {/* Hard coded productId to test add to cart feature
            1. Salmon
            2. Cabbage
          */}
          <AltItem
            setLoading={setLoading}
            productId="1751568389"
            imageURL="/images/fish.svg"
            title="Salmon"
            description="Local"
          />
          <AltItem
            setLoading={setLoading}
            productId="1751571917"
            imageURL="/images/vegetable.svg"
            title="Beyond Meat"
          />
        </CartSection>
      </Transition>
    );
  } else {
    return (
      <h1 className="w-6/12 text-center mx-auto flex-1">
        No items which emits GHG have been detected
      </h1>
    );
  }
}

export default Cart;
