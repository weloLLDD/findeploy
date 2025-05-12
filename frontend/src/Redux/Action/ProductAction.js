import axios from "axios";
import { FPRODUCT_UPDATE_FAIL, FPRODUCT_UPDATE_REQUEST, FPRODUCT_UPDATE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/ProductConstant";
import { logout } from "./userActions";


// List Product

export const listProduct = (keyword="",pageNumber="") => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({type:PRODUCT_LIST_SUCCESS,
            payload: data
        });


    } catch (error) {

        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        });
        
    }
};

//SINGLE DETAILS

export const listProductDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {

        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        });
        
    }
};


 


 //update PRODUCT
   export const editProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: FPRODUCT_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(userInfo),
      };
  
      const {data} = await axios.put(`/api/products/${product._id}`,product, config);
      dispatch({ type: FPRODUCT_UPDATE_SUCCESS,payload:data}); 
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: FPRODUCT_UPDATE_FAIL,
        payload: message,
      });
    }
  };

   //update PRODUCT cart
   export const updateProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(userInfo),
      };
  
      const {data} = await axios.put(`/api/products/${product._id}`,product, config);
      dispatch({ type: PRODUCT_UPDATE_SUCCESS,payload:data}); 
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      });
    }
  };