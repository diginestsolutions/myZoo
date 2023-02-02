import axios from '../../CustomAxios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOADING } from '../constants/homeConstant';
import { 
    ABOUT_US_FAIL, 
    ABOUT_US_SUCCESS, 
    ADDRESS_LIST_FAIL, 
    ADDRESS_LIST_SUCCESS, 
    ADDRESS_TYPE_FAIL, 
    ADDRESS_TYPE_SUCCESS, 
    CHANGE_PASSWORD_FAIL, 
    CHANGE_PASSWORD_SUCCESS, 
    CONTACT_US_FAIL, 
    CONTACT_US_SUCCESS, 
    DELETE_ADDRESS_FAIL, 
    DELETE_ADDRESS_SUCCESS, 
    FAQS_FAIL, 
    FAQS_SUCCESS, 
    MAKE_DEFAULT_ADDRESS_FAIL, 
    MAKE_DEFAULT_ADDRESS_SUCCESS, 
    PRIVACY_POLICY_FAIL, 
    PRIVACY_POLICY_SUCCESS, 
    PUBLIC_PROFILE_FAIL, 
    PUBLIC_PROFILE_SUCCESS, 
    STATE_LIST_FAIL, 
    STATE_LIST_SUCCESS, 
    UPDATE_ADDRESS_FAIL, 
    UPDATE_ADDRESS_SUCCESS, 
    UPDATE_PUBLIC_PROFILE_FAIL, 
    UPDATE_PUBLIC_PROFILE_SUCCESS, 
    UPDATE_USER_FAIL, 
    UPDATE_USER_PROFILE_FAIL, 
    UPDATE_USER_PROFILE_SUCCESS, 
    UPDATE_USER_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_SUCCESS
} from '../constants/settingsConstant';
import { AUTH_INPUT } from '../constants/authConstant';


//ABOUTUS
export const getAboutUs = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_aboutUs`, data)  
    .then(async response => {
        dispatch({
            type: ABOUT_US_SUCCESS,
            payload: response.data.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: ABOUT_US_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//FAQS
export const getFaqs = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_faq`, data)  
    .then(async response => {
        dispatch({
            type: FAQS_SUCCESS,
            payload: response.data.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: FAQS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//PRIVACYPOLICY
export const getPrivacyPolicy = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_privacy`, data)  
    .then(async response => {
        dispatch({
            type: PRIVACY_POLICY_SUCCESS,
            payload: response.data.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: PRIVACY_POLICY_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//CONTACTUS
export const contactUs = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customer/contactus`, datas)  
    .then(async response => {
        dispatch({
            type: CONTACT_US_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: CONTACT_US_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//UPDATEADDRESS
export const saveAndUpdateAddress = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customeraddress/_saveCustomerAddress`, datas)  
    .then(async response => {
        dispatch({
            type: UPDATE_ADDRESS_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: UPDATE_ADDRESS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//MAKE AS DEFAULT ADDRESS
export const makeDefaultAddress = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customeraddress/SetDefault`,data)  
    .then(async response => {
        dispatch({
            type: MAKE_DEFAULT_ADDRESS_SUCCESS,
            payload: response.data
        })

        await AsyncStorage.setItem("defAddress", JSON.stringify(response.data))

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: MAKE_DEFAULT_ADDRESS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//DELETE ADDRESS
export const deleteAddress = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customeraddress/_deleteCustomerAddress`, datas)  
    .then(async response => {
        dispatch({
            type: DELETE_ADDRESS_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: DELETE_ADDRESS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//ADDRESSTYPE
export const getAddressType = () => async(dispatch) => {

    await axios.post(`customeraddress/listAddressType`)  
    .then(async response => {

        if(response.data.status){
            dispatch({
                type: ADDRESS_TYPE_SUCCESS,
                payload: response.data.data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        }
        else{
            dispatch({
                type: ADDRESS_TYPE_FAIL,
                payload: response.data.data
            })
        }
    })
    .catch(async error => {

        dispatch({
            type: ADDRESS_TYPE_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}




//ADDRESSLIST
export const listAddress = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customeraddress/_loadAddressOfUser`, datas)  
    .then(async response => {
        dispatch({
            type: ADDRESS_LIST_SUCCESS,
            payload: response.data.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: ADDRESS_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//GETSTATELIST
export const getStateList = (data) => async(dispatch) => {

    await axios.post(`admin/states/listStateWithCountryId`,data)  
    .then(async response => {

        dispatch({
            type: STATE_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
       
    })
    .catch(async error => {

        dispatch({
            type: STATE_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//USERPROFILE
export const getUserProfile = (id) => async(dispatch) => {

    let data = {
        UserId: id
    }
    await axios.post(`api/profile/UserProfile/Get`, data)  
    .then(async response => {
        dispatch({
            type: AUTH_INPUT,
            payload: {
                prop: 'profileData',
                value: response.data[0]
            }
        })
    })
    .catch(async error => {

        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error
        })
        
    });
}

//SAVE and UPDATE USER PROFILE
export const updateUserProfile = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`admin/UserProfile/_save`, datas)  
    .then(async response => {
        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//UPDATEPUBLICPROFILE
export const updatePublicProfile = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`api/profile/UserProfile/PublicProfilesave`, datas)  
    .then(async response => {
        dispatch({
            type: UPDATE_PUBLIC_PROFILE_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: UPDATE_PUBLIC_PROFILE_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//GETPUBLICPROFILE
export const getPublicProfile = (data) => async(dispatch) => {

    await axios.post(`admin/UserProfile/GetPublicProfile`, data)  
    .then(async response => {
        dispatch({
            type: PUBLIC_PROFILE_SUCCESS,
            payload: response.data
        })

    })
    .catch(async error => {

        dispatch({
            type: PUBLIC_PROFILE_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//Change Password
export const changePasswordd = (datas) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`admin/UserProfile/ChangePassword`, datas)  
    .then(async response => {
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}