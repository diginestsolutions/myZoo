import axios from '../../CustomAxios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOADING } from '../constants/homeConstant'
import { 
    COUNTRY_FAIL, 
    COUNTRY_SUCCESS, 
    FORGET_PASSWORD_FAIL, 
    FORGET_PASSWORD_SUCCESS, 
    GETSETTINGS_FAIL, 
    GETSETTINGS_SUCCESS, 
    LOGIN_FAIL, LOGIN_SUCCESS, 
    OTP_FAIL, 
    OTP_SUCCESS, 
    REGISTER_FAIL, 
    REGISTER_SUCCESS, 
    RESET_AUTH, 
    RESET_PASSWORD_FAIL, 
    RESET_PASSWORD_SUCCESS 
} from '../constants/authConstant'


//Login
export const loginUser = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Login`, data)
    .then(async response => {

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response?.data
        })  
                
        await AsyncStorage.setItem("user", JSON.stringify(response?.data))

        await AsyncStorage.setItem("token", response?.data?.token)  
       
    })
    .catch(async error => {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    })
}
// get settings
export const getSettings = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/Mob_products/CommonData`, data)
    .then(async response => {

        dispatch({
            type: GETSETTINGS_SUCCESS,
            payload: response?.data
        })  
       
    })
    .catch(async error => {
        dispatch({
            type: GETSETTINGS_FAIL,
            payload: error
        })
    })
}

//Forget password
export const forgetPswd = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`mobileforgot-password`, data)
    .then(async response => {
        if(response.data.status){
            dispatch({
                type: FORGET_PASSWORD_SUCCESS,
                payload: response.data
            })
            await AsyncStorage.setItem("registeredEmail", JSON.stringify(response.data)) 
        }
        else{
            dispatch({
                type: FORGET_PASSWORD_FAIL,
                payload: response.data.msg
            })
        }
    })
    .catch(async error => {
        dispatch({
            type: FORGET_PASSWORD_FAIL,
            payload: error
        })
    })
}

//OTP
export const sendOtp = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`mobileforgot-password/_verifyotp`, datas)
    .then(async response => {
        if(response.data.status){
            dispatch({
                type: OTP_SUCCESS,
                payload: response.data
            })

        }
        else{
            dispatch({
                type: OTP_FAIL,
                payload: response.data.msg
            })
        }
    })
    .catch(async error => {
        dispatch({
            type: OTP_FAIL,
            payload: error
        })
    })
}


//Reset password
export const resetPswd = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`mobilereset-password`, datas)
    .then(async response => {
        if(response.data.status){
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: response.data
            })

        }
        else{
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: response.data.msg
            })
        }
    })
    .catch(async error => {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error
        })
    })
}

//Register
export const registerUser = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`mobile_register`, datas)
    .then(async response => {
        if(response?.data?.status){
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
        }
        else{
            dispatch({
                type: REGISTER_FAIL,
                payload: response.data.msg
            })
        }
             
    })
    .catch(async error => {
        dispatch({
            type: REGISTER_FAIL,
            payload: error
        })
    })
}


//COUNTRY
export const countriesList = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`admin/country/list`,data)
    .then(async response => {
        dispatch({
            type: COUNTRY_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   
       
    })
    .catch(async error => {
        dispatch({
            type: COUNTRY_FAIL,
            payload: error
        })
    })
}
