import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../Redux/Action/CartActions";

const PaymentScreen = ({history,match}) => {
  window.scrollTo(0, 0);
  

  const productId = match.params.id;
  const productList = useSelector((state) => state.productList);
  const { products} = productList;

  const cart = useSelector((state)=>state.cart)
  const {shippingAdress} = cart;

  if(!shippingAdress){
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("CASH");
 
  const dispatch = useDispatch()


  const submitHandler = (e) => {
    dispatch(savePayment(paymentMethod));
    products.map((product)=>{
      history.push(`/placeorder/${productId}`);
    })
 
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input className="form-check-input" type="radio" value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              
              />
              <label className="form-check-label">Payment Cash</label>
            </div>
          </div>
   
            
          <button type="submit">
          <Link to={`/placeorder/${products._id}`} className="text-white">
            Continue
          </Link>
        </button>
  



        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
