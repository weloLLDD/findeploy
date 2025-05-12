import axios from "axios"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE__FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants"


//login
export const login = (email, password)  => async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST})
        const config ={
            Headers:{
                "Content-Type":"application/json",
            },
        } 
const {data} = await axios.post(`/api/users/login`, {email, password},config);
dispatch({type:USER_LOGIN_SUCCESS,payload: data});
localStorage.setItem("userInfo",JSON.stringify(data));  
 
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        });
    }
}

//logout

export const logout = ()  => async(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({type:USER_LOGOUT});
    dispatch({type:USER_DETAILS_RESET});
    dispatch({type:ORDER_LIST_MY_RESET});
    document.location.href="/login";
}



// register

export const register = (name,email, password)  => async(dispatch)=>{
    try {
        dispatch({type:USER_REGISTER_REQUEST})
        const config ={
            Headers:{
                "Content-Type":"application/json",
            },
        } 
const {data} = await axios.post(`/api/users`, {name,email, password},config);
dispatch({type:USER_REGISTER_SUCCESS,payload: data});
dispatch({type:USER_LOGIN_SUCCESS,payload: data});


localStorage.setItem("userInfo",JSON.stringify(data));      
 
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        });
    }
}

// USER DETAILS

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST }); 
    const {
      userLogin: { userInfo },
    } = getState();
    
 /*   const config = {
      Headers: {
        "Authorization": `Bearer  ${userInfo.token}`,
      },
    }; */
// NOUS AVONS MODIFIER ACCIER CODE POUR NOUS CODE DE CONFIG POUR RECUPER LE PROTECT DE JSWEBTOKEN en redux

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      },
      body: JSON.stringify(userInfo)
    };
  


    const { data } = await axios.get(`/api/users/${id}`,config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// UPDATE USER

export const updateUserProfile = (user)  => async(dispatch,getState)=>{
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST }); 

    const {userLogin: { userInfo },} = getState();

    /*const config = {
      Headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }; */

    // NOUS AVONS MODIFIER ACCIER CODE POUR NOUS CODE DE CONFIG POUR RECUPER LE PROTECT DE JSWEBTOKEN 

    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      },
      body: JSON.stringify(userInfo)
    };

    const { data } = await axios.put(`/api/users/profile`,user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({type:USER_LOGIN_SUCCESS,payload: data});
    
    localStorage.setItem("userInfo",JSON.stringify(data))


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Request failed with 404") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE__FAIL,
      payload: message,
    });
  }

}