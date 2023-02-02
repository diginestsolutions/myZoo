import { 
    CATEGORY_LIST_FAIL, 
    CATEGORY_LIST_SUCCESS, 
    FAVOURITE_ARRAY, 
    HOME_INPUT, 
    LATEST_ACCESSORIES_FAIL, 
    LATEST_ACCESSORIES_SUCCESS, 
    LATEST_PETS_FAIL, 
    LATEST_PETS_SUCCESS, 
    LATEST_SERVICES_FAIL, 
    LATEST_SERVICES_SUCCESS, 
    LOADING, 
    MYZOOPICKS_PRODUCT_FAIL, 
    MYZOOPICKS_PRODUCT_SUCCESS, 
    MYZOO_PICKS_FAIL, 
    MYZOO_PICKS_SUCCESS, 
    PRODUCT_BYID_FAIL, 
    PRODUCT_BYID_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_SUCCESS, 
    RECENT_POST_FAIL, 
    RECENT_POST_SUCCESS, 
    RESET_ERROR, 
    RESET_ITEM, 
    RESET_PRODUCT, 
    SERVICES_FAIL, 
    SERVICES_SUCCESS, 
    SET_ACTIVE_ITEM, 
    SUBCATEGORY_LIST_FAIL, 
    SUBCATEGORY_LIST_SUCCESS 
} from "../constants/homeConstant"
import { EVERY_RANGES_FAIL, EVERY_RANGES_SUCCESS } from "../constants/myItemsConstant"


export  const homeReducer = (state = { filterValue: {
    Type:2,
    Bread:[],
    AgeType:"",
    minAge :"",
    maxAge :"",
    SizeType:"",
    minSize :"",
    maxSize :"",
    WeightType:"",
    minWeight:"",
    maxWeight:"",
    SerCategory:"",
    SubCategory:"",
    Country:"",
    State:"",
    City:"",
    accCategory:[""],
    SellingMode:[""],
    IsVendorProduct:true,
    IsIndividualSellerProduct:""
} }, action) => {
    switch(action.type){

        case LOADING:
            return{
                ...state,
                loading: action.payload
            }
        
        case RESET_ERROR:
            return{
                ...state,
                error: null
            }

        case RESET_PRODUCT:
            return{
                ...state,
                productById: null,
            }

        case CATEGORY_LIST_FAIL:
        case SUBCATEGORY_LIST_FAIL:
        case MYZOO_PICKS_FAIL:
        case LATEST_PETS_FAIL:
        case LATEST_ACCESSORIES_FAIL:
        case LATEST_SERVICES_FAIL:
        case RECENT_POST_FAIL:
        case MYZOOPICKS_PRODUCT_FAIL:
        case PRODUCT_BYID_FAIL:
        case PRODUCT_LIST_FAIL:
        case SERVICES_FAIL:
        case EVERY_RANGES_FAIL:
            return{
                ...state,
                error: action.payload.message
            }

        case HOME_INPUT:
            return{
                ...state,
                [action.payload.prop] : action.payload.value
            }

        case CATEGORY_LIST_SUCCESS:
            return{
                ...state,
                categoryList: action.payload,
            }

        case SUBCATEGORY_LIST_SUCCESS:
            return{
                ...state,
                subCategoryList: action.payload,
            }

        case MYZOO_PICKS_SUCCESS:
            return{
                ...state,
                myZooPicks: action.payload
            }

        case MYZOOPICKS_PRODUCT_SUCCESS:
            return{
                ...state,
                myZooPicksProduct: action.payload
            }
        
        case PRODUCT_BYID_SUCCESS:
            return{
                ...state,
                productById: action.payload
            }
        
        case PRODUCT_LIST_SUCCESS:
            return{
                ...state,
                productList: action.payload
            }

        case SET_ACTIVE_ITEM:
            return{
                ...state,
                activeItem: action.payload
            }

        case LATEST_PETS_SUCCESS:
            return{
                ...state,
                latestPets: action.payload,
            }

        case LATEST_ACCESSORIES_SUCCESS:
            return{
                ...state,
                latestAccessories: action.payload
            }

        case LATEST_SERVICES_SUCCESS:
            return{
                ...state,
                services: action.payload
            }

        case SERVICES_SUCCESS:
            return{
                ...state,
                latestServices: action.payload
            }

        case RECENT_POST_SUCCESS:
            return{
                ...state,
                recentPost: action.payload
            }

        case EVERY_RANGES_SUCCESS:
            return{
                ...state,
                everyRanges: action.payload
            }

        case FAVOURITE_ARRAY:
            return{
                ...state,
                favourites : action.payload
            }

        default:
            return state;
    }
}