import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { saveShppingAdress } from "../Redux/Action/CartActions";

const ShippingScreen = ({history}) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state)=>state.cart)
  const {shippingAdress} = cart;


  const [adress, setAdress]=useState("JUSTICE N°12/GOMBE")
  const [city, setCity]=useState("KINSHASA")
  const [postalcode, setPostalcode]=useState("003")
  const [country, setcountry]=useState("RDC")

  const dispatch = useDispatch()


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShppingAdress({adress,city,postalcode,country}));
    history.push("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input type="text" placeholder="Enter address"  
          value={adress} 
          required
          onChange={(e)=>setAdress(e.target.value)}

          />
          <input type="text" placeholder="Enter city" 
          value={city} 
          required
          onChange={(e)=>setCity(e.target.value)}
        
          />
          <input type="text" placeholder="Enter postal code" 
           value={postalcode} 
           required
           onChange={(e)=>setPostalcode(e.target.value)}
 
          />
          <input type="text" placeholder="Enter country" 
           value={country} 
           required
           onChange={(e)=>setcountry(e.target.value)}
          
          />
          <button type="submit">
            <Link to="/payment" className="text-white">
              Continue
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
