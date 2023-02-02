import { ADD_SERVICE_FAIL, ADD_SERVICE_SUCCESS, LOADING, MEMBERSHIP_LIST_FAIL, MEMBERSHIP_LIST_SUCCESS } from "../constants/myItemsConstant";
import { 
    ACCESSORIES_MEMSHP_PLANCHECK_FAIL,
    ACCESSORIES_MEMSHP_PLANCHECK_SUCCESS,
    ACCESSORIES_SAVE_FAIL,
    ACCESSORIES_SAVE_SUCCESS,
    ADD_COMPARE_LIST_FAIL,
    ADD_COMPARE_LIST_SUCCESS,
    ADD_FAVOURITE_FAIL,
    ADD_FAVOURITE_SUCCESS,
    ADD_WISHLIST_FAIL,
    ADD_WISHLIST_SUCCESS,
    AGE_TYPE_LIST_FAIL,
    AGE_TYPE_LIST_SUCCESS,
    BIDDERS_LIST_FAIL,
    BIDDERS_LIST_SUCCESS,
    CHANGE_ITEM_STATUS_FAIL,
    CHANGE_ITEM_STATUS_SUCCESS,
    COMPARE_LIST_FAIL, 
    COMPARE_LIST_SUCCESS, 
    CURRENCY_CHANGE_FAIL, 
    CURRENCY_CHANGE_SUCCESS, 
    CURRENCY_FAIL, 
    CURRENCY_SUCCESS, 
    DELETE_COMPARE_LIST_FAIL, 
    DELETE_COMPARE_LIST_SUCCESS, 
    DELETE_FAVOURITE_FAIL, 
    DELETE_FAVOURITE_SUCCESS, 
    DELETE_ITEM_FAIL, 
    DELETE_ITEM_SUCCESS, 
    DELETE_WISHLIST_FAIL, 
    DELETE_WISHLIST_SUCCESS, 
    EDIT_ACCESSORIES_DETAILS_FAIL, 
    EDIT_ACCESSORIES_DETAILS_SUCCESS, 
    EDIT_ITEM_FAIL, 
    EDIT_ITEM_SUCCESS, 
    EDIT_PET_DETAILS_FAIL, 
    EDIT_PET_DETAILS_SUCCESS, 
    EDIT_SERVICE_DETAILS_FAIL, 
    EDIT_SERVICE_DETAILS_SUCCESS, 
    EVERY_RANGES_FAIL, 
    EVERY_RANGES_SUCCESS, 
    FILTER_ITEM_FAIL, 
    FILTER_ITEM_SUCCESS, 
    LAST_BIDDING_AMOUNT_FAIL, 
    LAST_BIDDING_AMOUNT_SUCCESS, 
    MY_BIDDING_FAIL, 
    MY_BIDDING_SUCCESS, 
    MY_FAVOURITE_FAIL, 
    MY_FAVOURITE_SUCCESS, 
    MY_ITEM_LIST_FAIL, 
    MY_ITEM_LIST_SUCCESS, 
    PET_MEMSHP_PLANCHECK_FAIL, 
    PET_MEMSHP_PLANCHECK_SUCCESS, 
    PET_SAVE_FAIL, 
    PET_SAVE_SUCCESS, 
    RESET_ITEM, 
    SERVICE_MEMSHP_PLANCHECK_FAIL, 
    SERVICE_MEMSHP_PLANCHECK_SUCCESS, 
    SET_ACTIVE_CURRENCY, 
    SIZE_TYPE_LIST_FAIL, 
    SIZE_TYPE_LIST_SUCCESS, 
    SUBMIT_BID_FAIL, 
    SUBMIT_BID_SUCCESS, 
    WEIGHT_TYPE_LIST_FAIL, 
    WEIGHT_TYPE_LIST_SUCCESS, 
    WISHLIST_FAIL, 
    WISHLIST_SUCCESS 
} from "../constants/myItemsConstant";


export  const myItemsReducer = (state = { }, action) => {
    switch(action.type){

        case LOADING:
            return{
                ...state,
                loading: action.payload
            }

        case RESET_ITEM:
            return{
                ...state,
                deleteCompare: null,
                deleteWishList: null,
                addWishList: null,
                fav: null,
                del : null,
                filterSuccess: null
            }

        case WISHLIST_FAIL:
        case MY_FAVOURITE_FAIL:
        case MY_ITEM_LIST_FAIL:
        case COMPARE_LIST_FAIL:
        case MY_BIDDING_FAIL:
        case SUBMIT_BID_FAIL:
        case FILTER_ITEM_FAIL:
        case AGE_TYPE_LIST_FAIL:
        case SIZE_TYPE_LIST_FAIL:
        case WEIGHT_TYPE_LIST_FAIL:
        case EVERY_RANGES_FAIL:
        case BIDDERS_LIST_FAIL:
        case LAST_BIDDING_AMOUNT_FAIL:
        case CURRENCY_FAIL:
        case CURRENCY_CHANGE_FAIL:
        case ADD_FAVOURITE_FAIL:
        case DELETE_FAVOURITE_FAIL:
        case ADD_WISHLIST_FAIL:
        case DELETE_WISHLIST_FAIL:
        case DELETE_COMPARE_LIST_FAIL:
        case ADD_COMPARE_LIST_FAIL:
        case SERVICE_MEMSHP_PLANCHECK_FAIL:
        case ACCESSORIES_MEMSHP_PLANCHECK_FAIL:
        case PET_MEMSHP_PLANCHECK_FAIL:
        case PET_SAVE_FAIL:
        case ACCESSORIES_SAVE_FAIL:
        case EDIT_ITEM_FAIL:
        case DELETE_ITEM_FAIL:
        case CHANGE_ITEM_STATUS_FAIL:
        case EDIT_PET_DETAILS_FAIL:
        case EDIT_ACCESSORIES_DETAILS_FAIL:
        case EDIT_SERVICE_DETAILS_FAIL:
        case ADD_SERVICE_FAIL:
        case MEMBERSHIP_LIST_FAIL:

            return{
                ...state,
                error: action.payload?.message
            }

        case ADD_WISHLIST_SUCCESS:
            return{
                ...state,
                addWishList: action.payload,
            }
            
        case DELETE_WISHLIST_SUCCESS:
            return{
                ...state,
                deleteWishList: action.payload,
            }

        case WISHLIST_SUCCESS:
            return{
                ...state,
                myWishList: action.payload,
            }

        case ADD_FAVOURITE_SUCCESS:
            return{
                ...state,
                fav: action.payload
            }

        case DELETE_FAVOURITE_SUCCESS:
            return{
                ...state,
                del: action.payload
            }

        case MY_FAVOURITE_SUCCESS:
            return{
                ...state,
                myFavourite: action.payload,
            }

        case CHANGE_ITEM_STATUS_SUCCESS:
            return{
                ...state,
                itemStatusChange: action.payload,
            }
        case DELETE_ITEM_SUCCESS:
            return{
                ...state,
                itemDelete: action.payload,
            }

        case EDIT_ITEM_SUCCESS:
            return{
                ...state,
                itemEdit: action.payload,
            }

        case MY_ITEM_LIST_SUCCESS:
            return{
                ...state,
                myItemList: action.payload,
            }

        case COMPARE_LIST_SUCCESS:
            return{
                ...state,
                compareList: action.payload,
            }

        case ADD_COMPARE_LIST_SUCCESS:
            return{
                ...state,
                compare: action.payload,
            }
        
        case DELETE_COMPARE_LIST_SUCCESS:
            return{
                ...state,
                deleteCompare: action.payload,
            }
        
        case MY_BIDDING_SUCCESS:
            return{
                ...state,
                myBidding: action.payload,
            }

        case LAST_BIDDING_AMOUNT_SUCCESS:
            return{
                ...state,
                currentBid: action.payload,
            }

        case BIDDERS_LIST_SUCCESS:
            return{
                ...state,
                biddersList: action.payload,
            }

        case SUBMIT_BID_SUCCESS:
            return{
                ...state,
                myBid: action.payload,
            }

        case FILTER_ITEM_SUCCESS:
            return{
                ...state,
                filterItem: action.payload,
                filterSuccess: true
            }

        case AGE_TYPE_LIST_SUCCESS:
            return{
                ...state,
                ageTypeList: action.payload,
            }

        case SIZE_TYPE_LIST_SUCCESS:
            return{
                ...state,
                sizeTypeList: action.payload,
            }
            
        case WEIGHT_TYPE_LIST_SUCCESS:
            return{
                ...state,
                weightTypeList: action.payload,
            }  

        case EVERY_RANGES_SUCCESS:
            return{
                ...state,
                allRanges: action.payload,
            }  


        case CURRENCY_SUCCESS:
            return {
                ...state,
                currencyLists: action.payload,
            }

        case CURRENCY_CHANGE_SUCCESS:
            return{
                ...state,
                changeCurrency: action.payload
            }

        case SET_ACTIVE_CURRENCY:
            return{
                ...state,
                selectedCurrency: action.payload
            }

        case SERVICE_MEMSHP_PLANCHECK_SUCCESS:
            return{
                ...state,
                serviceMemshp: action.payload,
            }  


        case ACCESSORIES_MEMSHP_PLANCHECK_SUCCESS:
            return {
                ...state,
                accessoriesMemshp: action.payload,
            }

        case PET_MEMSHP_PLANCHECK_SUCCESS:
            return{
                ...state,
                petMemshp: action.payload
            }

        case PET_SAVE_SUCCESS:
            return {
                ...state,
                savePet: action.payload,
            }

        case ACCESSORIES_SAVE_SUCCESS:
            return{
                ...state,
                saveAccessories: action.payload
            }

        case ADD_SERVICE_SUCCESS:
            return{
                ...state,
                addedService: action.payload
            }

        case EDIT_PET_DETAILS_SUCCESS:
            return{
                ...state,
                editPetDetails: action.payload
            }
        
        case EDIT_ACCESSORIES_DETAILS_SUCCESS:
            return{
                ...state,
                editAccessoriesDetails: action.payload
            }
        
        case EDIT_SERVICE_DETAILS_SUCCESS:
            return{
                ...state,
                editServiceDetails: action.payload
            }
        case MEMBERSHIP_LIST_SUCCESS:
            return{
                ...state,
                memshpList: action.payload
            }

        default:
            return state;
    }
}