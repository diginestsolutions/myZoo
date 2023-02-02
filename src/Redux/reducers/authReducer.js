import { 
    AUTH_INPUT,
    COUNTRY_FAIL, 
    COUNTRY_SUCCESS, 
    FORGET_PASSWORD_FAIL, 
    FORGET_PASSWORD_SUCCESS, 
    GETSETTINGS_FAIL, 
    GETSETTINGS_SUCCESS, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    OTP_FAIL, 
    OTP_SUCCESS, 
    REGISTER_FAIL, 
    REGISTER_SUCCESS, 
    RESET_AUTH, 
    RESET_PASSWORD_FAIL, 
    RESET_PASSWORD_SUCCESS, 
    SET_ACTIVE_COUNTRY, 
} from "../constants/authConstant";

import { LOADING } from "../constants/homeConstant";
import { UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_SUCCESS, USER_PROFILE_SUCCESS } from "../constants/settingsConstant";

export  const authReducer = (state = { }, action) => {
    switch(action.type){

        case AUTH_INPUT:
            return{
                ...state,
                [action.payload.prop]: action.payload.value
            }

        case LOGOUT:
            return{
                ...state,
                user: null
            }

       
        case RESET_AUTH:
            return{
                ...state,
                error: null,
                contact: null,
                loginSuccess: null,
                registerSuccess: null,
                forgetPswdSuccess: null,
                verifySuccess: null,
                profileSuccess: null
            }
        case LOADING:
            return{
                ...state,
                loading: action.payload,
            }

        
        case LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.payload,  
                loginSuccess: true,
                loading: false,
                               
            }
        case LOGIN_FAIL:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }

        case GETSETTINGS_SUCCESS:
            return {
                ...state,
                settingsData: action.payload,  
                loading: false,
            }
        case GETSETTINGS_FAIL:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerSuccess: true,
                loading: false,
            }
        case REGISTER_FAIL:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }

        case FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                forgetPswdSuccess: true,
                loading: false,
            }
        case FORGET_PASSWORD_FAIL:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }

        case OTP_SUCCESS:
            return {
                ...state,
                verifySuccess: true,
                loading: false,
            }
        case OTP_FAIL:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                changeSuccess: true,
                loading: false,
            }
        case RESET_PASSWORD_FAIL:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }

        case COUNTRY_SUCCESS:
            return {
                ...state,
                countryList: action.payload,
                loading: false,
            }
        case COUNTRY_FAIL:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }
        case SET_ACTIVE_COUNTRY:
            return{
                ...state,
                selectedCountry: action.payload
            }

        case USER_PROFILE_SUCCESS:
            return{
                ...state,
                userData: action.payload.data
            }
        case UPDATE_USER_PROFILE_SUCCESS:
            return{
                ...state,
                userProfile: action.payload,
                profileSuccess:true
            }
        
        case UPDATE_USER_PROFILE_FAIL:
            return{
                ...state,
                error: action.payload,
            }

        

        default:
            return state;
    }
}