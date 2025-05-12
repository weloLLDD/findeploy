import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";                         
import PrivanteRoute from "./screens/privanteRoute";

const App = () => {
  return (
    <Router>
      <Switch>
       <Route path="/" component={HomeScreen} exact/>
        <Route path="/search/:keyword" component={HomeScreen} exact/>
        <Route path="/page/:pagenumber" component={HomeScreen} exact/>
        <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact/>
 
        <Route path="/login" component={Login} /> 
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/register" component={Register} />
        <PrivanteRoute path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivanteRoute path="/shipping" component={ShippingScreen} />
        <PrivanteRoute path="/payment" component={PaymentScreen} />
        <PrivanteRoute path="/placeorder/:id" component={PlaceOrderScreen} />
        <PrivanteRoute path="/order/:id" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
