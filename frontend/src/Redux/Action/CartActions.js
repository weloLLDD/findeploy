
import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADRESS} from "../constants/CartConstants";

//add product to cart

export const addToCart = (id,qty) =>async(dispatch, getState) =>{

    
    const {data} = await axios.get(`/api/products/${id}`);



    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,   
            qty,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// remove product from cart 

export const removefromcart =(id) =>(dispatch,getState) =>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));

}

//  save shipping

export const saveShppingAdress =(data) =>(dispatch) =>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADRESS,
        payload:data,
    });

    localStorage.setItem("shippingAdress",JSON.stringify(data));

}


//  save METHOD PAYEMENT 

export const savePayment =(data) =>(dispatch) =>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data,
    });

    localStorage.setItem("paymentMethod",JSON.stringify(data));

}

 