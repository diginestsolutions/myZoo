import AsyncStorage from '@react-native-async-storage/async-storage'
import reactotron from 'reactotron-react-native';
import axios from '../../CustomAxios'
import { AUTH_INPUT } from '../constants/authConstant';
import { FAVOURITE_ARRAY } from '../constants/homeConstant';
import { ADD_SERVICE_FAIL, ADD_SERVICE_SUCCESS, LOADING, MEMBERSHIP_LIST_FAIL, MEMBERSHIP_LIST_SUCCESS } from '../constants/myItemsConstant';
import { 
    AGE_TYPE_LIST_FAIL,
    AGE_TYPE_LIST_SUCCESS,
    COMPARE_LIST_FAIL, 
    COMPARE_LIST_SUCCESS, 
    EVERY_RANGES_SUCCESS,
    EVERY_RANGES_FAIL,
    FILTER_ITEM_SUCCESS,
    FILTER_ITEM_FAIL,
    MY_BIDDING_FAIL, 
    MY_BIDDING_SUCCESS, 
    MY_FAVOURITE_FAIL, 
    MY_FAVOURITE_SUCCESS, 
    MY_ITEM_LIST_FAIL, 
    MY_ITEM_LIST_SUCCESS, 
    SIZE_TYPE_LIST_FAIL, 
    SIZE_TYPE_LIST_SUCCESS, 
    SUBMIT_BID_FAIL, 
    SUBMIT_BID_SUCCESS, 
    WEIGHT_TYPE_LIST_FAIL, 
    WEIGHT_TYPE_LIST_SUCCESS, 
    WISHLIST_FAIL, 
    WISHLIST_SUCCESS, 
    BIDDERS_LIST_SUCCESS,
    BIDDERS_LIST_FAIL,
    LAST_BIDDING_AMOUNT_SUCCESS,
    LAST_BIDDING_AMOUNT_FAIL,
    CURRENCY_SUCCESS,
    CURRENCY_FAIL,
    ADD_FAVOURITE_SUCCESS,
    ADD_FAVOURITE_FAIL,
    DELETE_FAVOURITE_SUCCESS,
    DELETE_FAVOURITE_FAIL,
    ADD_WISHLIST_SUCCESS,
    ADD_WISHLIST_FAIL,
    DELETE_WISHLIST_SUCCESS,
    DELETE_WISHLIST_FAIL,
    DELETE_COMPARE_LIST_SUCCESS,
    DELETE_COMPARE_LIST_FAIL,
    ADD_COMPARE_LIST_SUCCESS,
    ADD_COMPARE_LIST_FAIL,
    SERVICE_MEMSHP_PLANCHECK_SUCCESS,
    SERVICE_MEMSHP_PLANCHECK_FAIL,
    ACCESSORIES_MEMSHP_PLANCHECK_SUCCESS,
    ACCESSORIES_MEMSHP_PLANCHECK_FAIL,
    PET_MEMSHP_PLANCHECK_SUCCESS,
    PET_MEMSHP_PLANCHECK_FAIL,
    PET_SAVE_SUCCESS,
    PET_SAVE_FAIL,
    ACCESSORIES_SAVE_SUCCESS,
    ACCESSORIES_SAVE_FAIL,
    CURRENCY_CHANGE_SUCCESS,
    CURRENCY_CHANGE_FAIL,
    EDIT_ITEM_SUCCESS,
    EDIT_ITEM_FAIL,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAIL,
    CHANGE_ITEM_STATUS_SUCCESS,
    CHANGE_ITEM_STATUS_FAIL
} from '../constants/myItemsConstant';


//ADDWISHLIST
export const addWishlist = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/Mob_products/_savewishlist`, data)  
    .then(async response => {
        dispatch({
            type: ADD_WISHLIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: ADD_WISHLIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//DELETEWISHLIST
export const deleteWishlist = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/Mob_products/_deletewishlist`, data)  
    .then(async response => {
        dispatch({
            type: DELETE_WISHLIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: DELETE_WISHLIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//GETMYWISHLIST
export const getMyWishlist = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`home/wishlist`, data)  
    .then(async response => {
        dispatch({
            type: WISHLIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: WISHLIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//ADDFAVOURITE
export const addFavourite = (data, favourites) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/Mob_products/_savefavorite`, data)  
    .then(async response => {
        dispatch({
            type: ADD_FAVOURITE_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: FAVOURITE_ARRAY,
            payload: [...favourites, data?.productId]
        })
        dispatch({
            type: LOADING,
            payload: false
        })
        
    })
    .catch(async error => {

        dispatch({
            type: ADD_FAVOURITE_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })

       
    });
}

//DELETEFAVOURITE
export const deleteFavourite = (data, favourites) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`admin/accounts/_deletefavorite`, data)  
    .then(async response => {


        dispatch({
            type: FAVOURITE_ARRAY,
            payload: favourites.filter(fav => fav !== data?.productId)
        })

        dispatch({
            type: DELETE_FAVOURITE_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
       
    })
    .catch(async error => {

        dispatch({
            type: DELETE_FAVOURITE_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    });
}


// //GETMYFAVOURITE
export const getMyFavourite = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`home/favorateslist`, data)  
    .then(async response => {
        let lists = response.data.map(fav => fav?.product?._id)

        dispatch({
            type: FAVOURITE_ARRAY,
            payload: lists
        })

        dispatch({
            type: MY_FAVOURITE_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: MY_FAVOURITE_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}





// CHANGE ITEM STATUS
export const changeItemStatus = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/items/_activateitem`)  
    .then(async response => {
        dispatch({
            type: CHANGE_ITEM_STATUS_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: CHANGE_ITEM_STATUS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// DELETE ITEM
export const deleteItem = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/items/_deleteitem`)  
    .then(async response => {
        dispatch({
            type: DELETE_ITEM_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: DELETE_ITEM_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// EDIT ITEM
export const editItem = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/items/_loaditem`)  
    .then(async response => {
        dispatch({
            type: EDIT_ITEM_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: EDIT_ITEM_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// MY ITEM LIST
export const getMyItemsList = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/items/_list`)  
    .then(async response => {
        dispatch({
            type: MY_ITEM_LIST_SUCCESS,
            payload: response.data.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: MY_ITEM_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//GETCOMPARELIST
export const getCompareList = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`home/comparisonlist`, data)  
    .then(async response => {
        dispatch({
            type: COMPARE_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: COMPARE_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//ADD COMPARE
export const addCompare = (data) => async(dispatch) => {
    
    await axios.post(`Front_End/Mob_products/_savecomparelist`, data)  
    .then(async response => {
        dispatch({
            type: ADD_COMPARE_LIST_SUCCESS,
            payload: response.data
        })
        
    })
    .catch(async error => {

        dispatch({
            type: ADD_COMPARE_LIST_FAIL,
            payload: error
        })

       
    });
}

//DELETE FROM COMPARELIST
export const deleteCompareList = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/Mob_products/_deletecomparelist`, data)  
    .then(async response => {
        
        dispatch({
            type: DELETE_COMPARE_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: DELETE_COMPARE_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//GETMYBIDDING
export const getMyBidding = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/items/mybiddings`, data)  
    .then(async response => {
        dispatch({
            type: MY_BIDDING_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: MY_BIDDING_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//GET LAST BIDDING AMOUNT
export const getLastBiddingAmount = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`profile/Bidding/priceLastBidding`, data)  
    .then(async response => {
        dispatch({
            type: LAST_BIDDING_AMOUNT_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: LAST_BIDDING_AMOUNT_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    });
}

//ALL BIDDERS LIST
export const getAllBidders = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`profile/Bidding/bidderslist`, data)  
    .then(async response => {
        dispatch({
            type: BIDDERS_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: BIDDERS_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//SUBMITBID
export const submitBidding = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`profile/Bidding/productBid`, datas)  
    .then(async response => {
        dispatch({
            type: SUBMIT_BID_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SUBMIT_BID_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//FILTERITEM
export const getFilterResult = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/home/filterProducts`, data)  
    .then(async response => {
        dispatch({
            type: FILTER_ITEM_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: FILTER_ITEM_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//AGETYPELIST
export const getAgeTypeList = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`admin/pets/_loadAgeType`)  
    .then(async response => {
        dispatch({
            type: AGE_TYPE_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: AGE_TYPE_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//SIZETYPELIST
export const getSizeTypeList = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`admin/pets/_loadSizeType`)  
    .then(async response => {
        dispatch({
            type: SIZE_TYPE_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SIZE_TYPE_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//WEIGHTTYPELIST
export const getWeightTypeList = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`admin/pets/_loadWeightType`)  
    .then(async response => {
        dispatch({
            type: WEIGHT_TYPE_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: WEIGHT_TYPE_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//EVERY RANGES PRICE WEIGHT SIZE
export const getEveryRanges = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/Mob_products/everyranges`)  
    .then(async response => {
        dispatch({
            type: EVERY_RANGES_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: EVERY_RANGES_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//CURRENCY
export const currencyList = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/currency/list`,data)
    .then(async response => {
        dispatch({
            type: CURRENCY_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   

    })
    .catch(async error => {
        dispatch({
            type: CURRENCY_FAIL,
            payload: error
        })
    })
}


//CURRENCY CHANGE
export const currencyChange = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/_updateUserCountry`,data)
    .then(async response => {

        let user = JSON.parse(await AsyncStorage.getItem("user"));

        user.Country = data?.Country

        await AsyncStorage.setItem("user", JSON.stringify(user))
        dispatch({
            type: AUTH_INPUT,
            payload: {
                prop: 'userData',
                value: user
            }
        })
        dispatch({
            type: CURRENCY_CHANGE_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   

    })
    .catch(async error => {
        dispatch({
            type: CURRENCY_CHANGE_FAIL,
            payload: error
        })
    })
}


// //GET MEMBERSHIP LIST
export const getMembershipList = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`seller/membership/_list`, data)  
    .then(async response => {
        dispatch({
            type: MEMBERSHIP_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: MEMBERSHIP_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//SERVICE MEMSHP PLANCHECK
export const serviceMemshpPlancheck = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/membership/_planservicedetails`,data)
    .then(async response => {
        dispatch({
            type: SERVICE_MEMSHP_PLANCHECK_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   

    })
    .catch(async error => {
        dispatch({
            type: SERVICE_MEMSHP_PLANCHECK_FAIL,
            payload: error
        })
    })
}

//ACCESSORIES MEMSHP PLANCHECK
export const accessoriesMemshpPlancheck = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/membership/_planservicedetails`,data)
    .then(async response => {
        dispatch({
            type: ACCESSORIES_MEMSHP_PLANCHECK_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   

    })
    .catch(async error => {
        dispatch({
            type: ACCESSORIES_MEMSHP_PLANCHECK_FAIL,
            payload: error
        })
    })
}

//PET MEMSHP PLANCHECK
export const petMemshpPlancheck = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`user/membership/_plandetails`,data)
    .then(async response => {
        dispatch({
            type: PET_MEMSHP_PLANCHECK_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   

    })
    .catch(async error => {
        dispatch({
            type: PET_MEMSHP_PLANCHECK_FAIL,
            payload: error
        })
    })
}


//PET SAVE
export const petSave = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`mobile/pets/_save`,datas, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
    .then(async response => {
        dispatch({
            type: PET_SAVE_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   

    })
    .catch(async error => {
        dispatch({
            type: PET_SAVE_FAIL,
            payload: error
        })
    })
}

//ACCESSORIES SAVE
export const accessoriesSave = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`mobile/accessories/_save`,data)
    .then(async response => {
        dispatch({
            type: ACCESSORIES_SAVE_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   

    })
    .catch(async error => {
        dispatch({
            type: ACCESSORIES_SAVE_FAIL,
            payload: error
        })
    })
}

//Add Service
export const addService = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`mobile/service/_save`,datas)
    .then(async response => {
        dispatch({
            type: ADD_SERVICE_SUCCESS,
            payload: response.data
        })  
        dispatch({
            type: LOADING,
            payload: false
        })   

    })
    .catch(async error => {
        dispatch({
            type: ADD_SERVICE_FAIL,
            payload: error
        })
    })
}

