import axios from '../../CustomAxios'
import { LOADING } from '../constants/homeConstant';
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
    WRITE_REVIEW_FAIL, 
    WRITE_REVIEW_SUCCESS 
} from '../constants/orderConstant';


//ORDER LIST
export const getOrderList = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/CartMob/_orderlist`, data)  
    .then(async response => {
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//ORDERED PRODUCT
export const getOrderedProduct = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/CartMob/_Details_of_ordered_product_new`, data)  
    .then(async response => {
        dispatch({
            type: ORDERED_PRODUCT_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: ORDERED_PRODUCT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//LEAVESELLERFEEDBACK
export const getSellerFeedback = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/CartMob/_leaveSellerFeedbacks`, datas)  
    .then(async response => {
        dispatch({
            type: SELLER_FEEDBACK_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SELLER_FEEDBACK_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//LEAVEDELIVERYFEEDBACK
export const getDeliveryFeedback = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/CartMob/_leaveDeliveryFeedbacks`, datas)  
    .then(async response => {
        dispatch({
            type: DELIVERY_FEEDBACK_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: DELIVERY_FEEDBACK_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//WRITEPRODUCTREVIEW
export const getProductReview = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/CartMob/_purchasedProductReviews`, datas)  
    .then(async response => {
        dispatch({
            type: WRITE_REVIEW_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: WRITE_REVIEW_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//REQUESTRETURN
export const getReturnRequest = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/CartMob/_requestReturned`, datas)  
    .then(async response => {
        dispatch({
            type: REQUEST_RETURN_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: REQUEST_RETURN_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//ORDERSTATUS
export const getOrderStatus = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/CartMob/get_all_order_status`,data)  
    .then(async response => {
        dispatch({
            type: ORDER_STATUS_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: ORDER_STATUS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//ONE SELLER DETAILS
export const getSellerDetails = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/detailsOneseller`,data)  
    .then(async response => {
        dispatch({
            type: SELLER_DETAILS_SUCCESS,
            payload: response.data.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SELLER_DETAILS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//GET SELLER PRODUCT
export const getSellerProducts = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_getproductList`,data)  
    .then(async response => {
        dispatch({
            type: SELLER_PRODUCTS_SUCCESS,
            payload: response.data.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SELLER_PRODUCTS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//LOAD SELLER RATINGS
export const getSellerRatings = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_loadCompanyRating`,data)  
    .then(async response => {
        dispatch({
            type: SELLER_RATINGS_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SELLER_RATINGS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//LOAD SELLER RATINGS REPLAY
export const getSellerRatingReplay = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_loadReplyCompanyRating`,data)  
    .then(async response => {
        dispatch({
            type: SELLER_RATINGS_REPLAY_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SELLER_RATINGS_REPLAY_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// SELLER RATINGS COUNT
export const getSellerRatingCount = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_CountOfRating`,data)  
    .then(async response => {
        dispatch({
            type: SELLER_RATINGS_COUNT_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SELLER_RATINGS_COUNT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// SAVE SELLER RATINGS
export const addSellerRating = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_saveComapnyRating`,data)  
    .then(async response => {
        dispatch({
            type: SAVE_SELLER_RATINGS_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SAVE_SELLER_RATINGS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// SAVE REPLAY COMPANY RATINGS
export const addReplayCompanyRating = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_saveReplyComapnyRating`,data)  
    .then(async response => {
        dispatch({
            type: SAVE_REPLAY_COMPANY_RATINGS_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SAVE_REPLAY_COMPANY_RATINGS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

