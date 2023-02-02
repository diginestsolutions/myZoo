import { LOADING } from "../constants/homeConstant"
import { 
    ABOUT_US_FAIL, 
    ABOUT_US_SUCCESS, 
    ADDRESS_LIST_FAIL, 
    ADDRESS_LIST_SUCCESS, 
    ADDRESS_TYPE_FAIL, 
    ADDRESS_TYPE_SUCCESS, 
    CONTACT_US_FAIL, 
    CONTACT_US_SUCCESS, 
    FAQS_FAIL, 
    FAQS_SUCCESS, 
    PRIVACY_POLICY_FAIL, 
    PRIVACY_POLICY_SUCCESS, 
    RESET,
    UPDATE_ADDRESS_FAIL,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_PUBLIC_PROFILE_FAIL,
    UPDATE_PUBLIC_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_SUCCESS,
    PUBLIC_PROFILE_SUCCESS,
    PUBLIC_PROFILE_FAIL,
    STATE_LIST_SUCCESS,
    STATE_LIST_FAIL,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAIL,
    MAKE_DEFAULT_ADDRESS_SUCCESS,
    MAKE_DEFAULT_ADDRESS_FAIL,
    SET_ACTIVE_ADDRESS,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    CHANGE_PASSWORD_SUCCESS
} from "../constants/settingsConstant"


export  const settingsReducer = (state = { }, action) => {
    switch(action.type){

        case LOADING:
            return{
                ...state,
                loading: action.payload
            }
        case RESET:
            return{
                ...state,
                error: null,
                contact: null,
                updateAddress: null,
                userDetails: null,
                publicPro: null
            }

        case ABOUT_US_FAIL:
        case FAQS_FAIL:
        case PRIVACY_POLICY_FAIL:
        case CONTACT_US_FAIL:
        case UPDATE_ADDRESS_FAIL:
        case ADDRESS_TYPE_FAIL:
        case ADDRESS_LIST_FAIL:
        case USER_PROFILE_FAIL:
        case UPDATE_PUBLIC_PROFILE_FAIL:
        case PUBLIC_PROFILE_FAIL:
        case DELETE_ADDRESS_FAIL:
        case MAKE_DEFAULT_ADDRESS_FAIL:
            return{
                ...state,
                error: action.payload
            }
        
        case ABOUT_US_SUCCESS:
            return{
                ...state,
                aboutUs: action.payload,
            }
        
        case FAQS_SUCCESS:
            return{
                ...state,
                faqs: action.payload,
            }

        case PRIVACY_POLICY_SUCCESS:
            return{
                ...state,
                privacyPolicy: action.payload,
            }

        case CONTACT_US_SUCCESS:
            return{
                ...state,
                contact: action.payload
            }

        case UPDATE_ADDRESS_SUCCESS:
            return{
                ...state,
                updateAddress: action.payload
            }

        case MAKE_DEFAULT_ADDRESS_SUCCESS:
            return{
                ...state,
                setDefault: action.payload
            }

        case DELETE_ADDRESS_SUCCESS:
            return{
                ...state,
                delAddress: action.payload
            }

        case ADDRESS_TYPE_SUCCESS:
            return{
                ...state,
                addressType: action.payload
            }

        case ADDRESS_LIST_SUCCESS:
            return{
                ...state,
                addressList: action.payload
            }

        

        case UPDATE_PUBLIC_PROFILE_SUCCESS:
            return{
                ...state,
                publicPro: action.payload
            }

        case PUBLIC_PROFILE_SUCCESS:
            return{
                ...state,
                showProfile: action.payload
            }

        
        case STATE_LIST_SUCCESS:
            return {
                ...state,
                stateList: action.payload,
            }

        case STATE_LIST_FAIL:
            return{
                ...state,
                error: action.payload,
            }

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                pswdChange: action.payload,
            }

        case SET_ACTIVE_ADDRESS:
            return {
                ...state,
                activeAddress: action.payload,
            }

       
            

        default:
            return state;
    }
}