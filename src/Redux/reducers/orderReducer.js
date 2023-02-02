import { LOADING } from "../constants/homeConstant";
import { 
    DELIVERY_FEEDBACK_FAIL, 
    DELIVERY_FEEDBACK_SUCCESS, 
    ORDERED_PRODUCT_FAIL, 
    ORDERED_PRODUCT_SUCCESS, 
    ORDER_LIST_FAIL, 
    ORDER_LIST_SUCCESS, 
    ORDER_STATUS_FAIL, 
    ORDER_STATUS_SUCCESS, 
    REQUEST_RETURN_FAIL, 
    REQUEST_RETURN_SUCCESS, 
    RESET_FEEDBACK, 
    SAVE_REPLAY_COMPANY_RATINGS_FAIL, 
    SAVE_REPLAY_COMPANY_RATINGS_SUCCESS, 
    SAVE_SELLER_RATINGS_FAIL, 
    SAVE_SELLER_RATINGS_SUCCESS, 
    SELLER_DETAILS_FAIL, 
    SELLER_DETAILS_SUCCESS, 
    SELLER_FEEDBACK_FAIL, 
    SELLER_FEEDBACK_SUCCESS, 
    SELLER_PRODUCTS_FAIL, 
    SELLER_PRODUCTS_SUCCESS, 
    SELLER_RATINGS_COUNT_FAIL, 
    SELLER_RATINGS_COUNT_SUCCESS, 
    SELLER_RATINGS_FAIL, 
    SELLER_RATINGS_REPLAY_FAIL, 
    SELLER_RATINGS_REPLAY_SUCCESS, 
    SELLER_RATINGS_SUCCESS, 
    SET_ACTIVE_ORDER, 
    WRITE_REVIEW_FAIL, 
    WRITE_REVIEW_SUCCESS 
} from "../constants/orderConstant";


export  const orderReducer = (state = { }, action) => {
    switch(action.type){

        case LOADING:
            return{
                ...state,
                loading: action.payload
            }

        case RESET_FEEDBACK:
            return{
                ...state,
                error: null,
                sellerFeedback: null,
                deliveryFeedback: null,
                productReview: null,
                returnRequest: null
            }

        case SELLER_FEEDBACK_FAIL:
        case DELIVERY_FEEDBACK_FAIL:
        case WRITE_REVIEW_FAIL:
        case REQUEST_RETURN_FAIL:
        case ORDER_STATUS_FAIL:
        case ORDER_LIST_FAIL:
        case ORDERED_PRODUCT_FAIL:
        case SELLER_DETAILS_FAIL:
        case SELLER_PRODUCTS_FAIL:
        case SELLER_RATINGS_FAIL:
        case SELLER_RATINGS_REPLAY_FAIL:
        case SELLER_RATINGS_COUNT_FAIL:
        case SAVE_SELLER_RATINGS_FAIL:
        case SAVE_REPLAY_COMPANY_RATINGS_FAIL:

            return{
                ...state,
                error: action.payload
            }

        case ORDER_LIST_SUCCESS:
            return{
                ...state,
                orderList: action.payload,
            }

        case ORDERED_PRODUCT_SUCCESS:
            return{
                ...state,
                orderedProduct: action.payload[0],
            }
        
        case SELLER_FEEDBACK_SUCCESS:
            return{
                ...state,
                sellerFeedback: action.payload,
            }

        case DELIVERY_FEEDBACK_SUCCESS:
            return{
                ...state,
                deliveryFeedback: action.payload,
            }

        case WRITE_REVIEW_SUCCESS:
            return{
                ...state,
                productReview: action.payload,
            }
        
        case REQUEST_RETURN_SUCCESS:
            return{
                ...state,
                returnRequest: action.payload,
            }

        case ORDER_STATUS_SUCCESS:
            return{
                ...state,
                orderStatus: action.payload,
            }
            
        case SELLER_DETAILS_SUCCESS:
            return{
                ...state,
                sellerDetails: action.payload,
            }
        
        case SELLER_PRODUCTS_SUCCESS:
            return{
                ...state,
                sellerProduct: action.payload,
            }

        case SELLER_RATINGS_SUCCESS:
            return{
                ...state,
                sellerRating: action.payload,
            }

        case SELLER_RATINGS_REPLAY_SUCCESS:
            return{
                ...state,
                sellerRatingReplay: action.payload,
            }

        case SELLER_RATINGS_COUNT_SUCCESS:
            return{
                ...state,
                sellerRatingCount: action.payload,
            }

        case SAVE_SELLER_RATINGS_SUCCESS:
            return{
                ...state,
                ratingSave: action.payload,
            }

        case SAVE_REPLAY_COMPANY_RATINGS_SUCCESS:
            return{
                ...state,
                repalyCompanyRating: action.payload,
            }

        case SET_ACTIVE_ORDER:
            return{
                ...state,
                activeOrder: action.payload
            }
    
        
        default:
            return state;
    }
}