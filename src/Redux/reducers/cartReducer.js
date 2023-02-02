import reactotron from "reactotron-react-native";
import { 
    ACCESSORIES_ADDTOCART_FAIL,
    ACCESSORIES_ADDTOCART_SUCCESS,
    CART_CHECKOUT_PAYMENT_FAIL,
    CART_CHECKOUT_PAYMENT_SUCCESS,
    CART_CHECKOUT_RESULT_FAIL,
    CART_CHECKOUT_RESULT_SUCCESS,
    CART_INPUT,
    CART_ITEMCOUNT_FAIL, 
    CART_ITEMCOUNT_SUCCESS, 
    DIRECT_BUY_RESULT_FAIL, 
    DIRECT_BUY_RESULT_SUCCESS, 
    ITEM_DELETE_FAIL, 
    ITEM_DELETE_SUCCESS, 
    LOAD_PRODUCT_FAIL, 
    LOAD_PRODUCT_SUCCESS, 
    MEMSHIP_BUY_PAYMENT_FAIL, 
    MEMSHIP_BUY_PAYMENT_SUCCESS, 
    MEMSHIP_BUY_RESULT_FAIL, 
    MEMSHIP_BUY_RESULT_SUCCESS, 
    PET_ADDTOCART_FAIL, 
    PET_ADDTOCART_SUCCESS, 
    PRODUCT_FEEDBACK_FAIL, 
    PRODUCT_FEEDBACK_SUCCESS, 
    UPDATE_CART, 
    UPDATE_CARTITEM_FAIL, 
    UPDATE_CARTITEM_SUCCESS
} from "../constants/cartConstant";
import { LOADING, RESET_ERROR } from "../constants/homeConstant";
import { RESET } from "../constants/settingsConstant";


export  const cartReducer = (state = { }, action) => {
    switch(action.type){

        case LOADING:
            return{
                ...state,
                loading: action.payload
            }

        case RESET:
            return{
                ...state,
                itemDelete: null,
                addAccessories: null,
                addPets:null
            }

        case LOAD_PRODUCT_FAIL:
        case CART_ITEMCOUNT_FAIL:
        case PET_ADDTOCART_FAIL:
        case ACCESSORIES_ADDTOCART_FAIL:
        case UPDATE_CARTITEM_FAIL:
        case DIRECT_BUY_RESULT_FAIL:
        case CART_CHECKOUT_PAYMENT_FAIL:
        case CART_CHECKOUT_RESULT_FAIL:
        case MEMSHIP_BUY_PAYMENT_FAIL:
        case MEMSHIP_BUY_RESULT_FAIL:
        case ITEM_DELETE_FAIL:
        case PRODUCT_FEEDBACK_FAIL:
            return{
                ...state,
                error: action.payload
            }

        case LOAD_PRODUCT_SUCCESS:
            return{
                ...state,
                cartItems: action.payload,
            }

        case CART_ITEMCOUNT_SUCCESS:
            return{
                ...state,
                count: action.payload,
            }

        case PET_ADDTOCART_SUCCESS:

            return{
                ...state,
                count: {
                    ...state.count,
                    CartCount: state?.count.CartCount + 1
                }
            }

        case UPDATE_CART:
            return {
                ...state,
                count: {
                    ...state.count,
                    CartCount: action.payload
                }
            }

        case ACCESSORIES_ADDTOCART_SUCCESS:
            return{
                ...state,
                addAccessories: true,
            }
        
        case UPDATE_CARTITEM_SUCCESS:
            return{
                ...state,
                updateCard: action.payload,
            }

        case ITEM_DELETE_SUCCESS:
            return{
                ...state,
                itemDelete: action.payload,

            }

//PAYMENT

        case DIRECT_BUY_RESULT_SUCCESS:
            return{
                ...state,
                directBuy: action.payload,
            }

        case CART_CHECKOUT_PAYMENT_SUCCESS:
            return{
                ...state,
                checkoutPayment: action.payload,
                checkOutId : true
            }

        case CART_CHECKOUT_RESULT_SUCCESS:
            return{
                ...state,
                checkoutResult: action.payload,
            }

        case MEMSHIP_BUY_PAYMENT_SUCCESS:
            return{
                ...state,
                buyPayment: action.payload,
            }

        case MEMSHIP_BUY_RESULT_SUCCESS:
            return{
                ...state,
                buyResult: action.payload,
            }

        case PRODUCT_FEEDBACK_SUCCESS:
            return{
                ...state,
                feedbackSuccess: true
            }

        case RESET_ERROR:
            return{
                ...state,
                error: null,
                feedbackSuccess: null,
                checkOutId: null
            }

        case CART_INPUT:
            return{
                ...state,
                [action.payload.prop] : action.payload.value
            }

        default:
            return state;
    }
}