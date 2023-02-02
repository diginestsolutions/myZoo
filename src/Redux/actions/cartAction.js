import { 
    ACCESSORIES_ADDTOCART_FAIL,
    ACCESSORIES_ADDTOCART_SUCCESS,
    CART_CHECKOUT_PAYMENT_FAIL,
    CART_CHECKOUT_PAYMENT_SUCCESS,
    CART_CHECKOUT_RESULT_SUCCESS,
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
    UPDATE_CARTITEM_FAIL,
    UPDATE_CARTITEM_SUCCESS
} from "../constants/cartConstant";
import { LOADING } from "../constants/homeConstant";
import axios from '../../CustomAxios'

//GETALLITEMS
export const getAllCartItems = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`admin/cart/_loadAllProduct`, data)  
    .then(async response => {
        dispatch({
            type: LOAD_PRODUCT_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: LOAD_PRODUCT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//GETCARTCOUNT
export const getcartItemCount = (data) => async(dispatch) => {

    await axios.post(`Front_End/Mob_products/CommonData`, data)  
    .then(async response => {
        dispatch({
            type: CART_ITEMCOUNT_SUCCESS,
            payload: response.data.data
        })

    })
    .catch(async error => {
        dispatch({
            type: CART_ITEMCOUNT_FAIL,
            payload: error
        })
    });
}


//PET ADD TO CART
export const addPetToCart = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/_addtocart`, datas)  
    .then(async response => {
        dispatch({
            type: PET_ADDTOCART_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: PET_ADDTOCART_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//ACCESSORIES ADD TO CART
export const addAccessoryToCart = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/_addtocart`, datas)  
    .then(async response => {
        dispatch({
            type: ACCESSORIES_ADDTOCART_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: ACCESSORIES_ADDTOCART_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//UPDATE CART ITEM
export const updateCartItem = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/_updateCartItem`, datas)  
    .then(async response => {
        dispatch({
            type: UPDATE_CARTITEM_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: UPDATE_CARTITEM_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//DIRECT BUY RESULT
export const directBuyResult = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/hyper_directbuy/result`, data)  
    .then(async response => {
        dispatch({
            type: DIRECT_BUY_RESULT_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: DIRECT_BUY_RESULT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//CART CHECKOUT PAYMENT FROM
export const cartCheckoutPayment = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/hyper_checkout`, data)  
    .then(async response => {
        dispatch({
            type: CART_CHECKOUT_PAYMENT_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: CART_CHECKOUT_PAYMENT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//CART CHECKOUT RESULT
export const cartCheckoutResult = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/hyper_checkout/result`, data)  
    .then(async response => {
        dispatch({
            type: CART_CHECKOUT_RESULT_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: CART_CHECKOUT_RESULT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//MEMBERSHIP BUY PAYMENT FORM
export const memshipBuyPayment = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/hyper_membership`, data)  
    .then(async response => {
        dispatch({
            type: MEMSHIP_BUY_PAYMENT_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: MEMSHIP_BUY_PAYMENT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//MEMBERSHIP BUY RESULT
export const memshipBuyResult = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/hyper_membership/result`, data)  
    .then(async response => {
        dispatch({
            type: MEMSHIP_BUY_RESULT_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: MEMSHIP_BUY_RESULT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//ITEM DELETE FROM CART
export const itemDeleteFromCart = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`Front_End/CartMob/delete`, data)  
    .then(async response => {
        dispatch({
            type: ITEM_DELETE_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: ITEM_DELETE_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//Add product Review
export const addProductReview = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`admin/Productchat/_saveproductreview`, data)  
    .then(async response => {
        dispatch({
            type: PRODUCT_FEEDBACK_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: PRODUCT_FEEDBACK_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}