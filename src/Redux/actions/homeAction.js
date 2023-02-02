import AsyncStorage from '@react-native-async-storage/async-storage'
import reactotron from 'reactotron-react-native';
import axios from '../../CustomAxios'
import axios1 from 'axios'
import { 
    CATEGORY_LIST_FAIL, 
    CATEGORY_LIST_SUCCESS, 
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
    SERVICES_FAIL, 
    SERVICES_SUCCESS, 
    SUBCATEGORY_LIST_FAIL, 
    SUBCATEGORY_LIST_SUCCESS,
     
} from '../constants/homeConstant';
import { API_URL } from '../../config/Constants';
import { EVERY_RANGES_FAIL, EVERY_RANGES_SUCCESS } from '../constants/myItemsConstant';

//GEt Dashboard Datas
export const getDashboardDatas = (params) => async(dispatch)=>{
    
    dispatch({
        type: LOADING,
        payload: true
    })
    let one = "admin/service/_loadServicesType"
    let two = "customer/home/latestpets"
    let three = "customer/home/latestaccessories"
    let four = "home/myzoopick"

    // let params = {
    //     countryId: Country
    // }
    
    const requestOne = axios.post(one);
    const requestTwo = axios.post(two, params, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const requestThree = axios.post(three, params);
    // const requestFour = axios.post(four, params, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });

    axios1.all([requestOne, requestTwo, requestThree]).then(axios1.spread((...responses) => {

        //reactotron
        const responseOne = responses[0].data
        const responseTwo = responses[1].data
        const responesThree = responses[2].data
        //const responesFour = responses[3].data.data
        // use/access the results 

        // dispatch({
        //     type: MYZOO_PICKS_SUCCESS,
        //     payload: responesFour
        // })

        dispatch({
            type: LATEST_SERVICES_SUCCESS,
            payload: responseOne
        })

        dispatch({
            type: LATEST_PETS_SUCCESS,
            payload: responseTwo
        })

        dispatch({
            type: LATEST_ACCESSORIES_SUCCESS,
            payload: responesThree
        })
        dispatch({
            type: LOADING,
            payload: false
        })

        //reactotron.log({ responseOne, responseTwo, responesThree })
    })).catch(errors => {
    // react on errors.
    dispatch({
        type: LOADING,
        payload: false
    })
    })
}


//MYZOOPICKS
export const getMyZooPicks = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    // fetch(`${API_URL}home/myzoopick`, {
    //     method: 'POST',
    //     body: JSON.stringify(data)
    // })
    // .then((response) => response.json())
    // .then((json) => {
    //     if(json.status){

    //         dispatch({
    //             type: MYZOO_PICKS_SUCCESS,
    //             payload: json.data
    //         })
    //         dispatch({
    //             type: LOADING,
    //             payload: false
    //         })

    //     }else{

    //         dispatch({
    //             type: MYZOO_PICKS_FAIL,
    //             payload: json.message
    //         })
    //         dispatch({
    //             type: LOADING,
    //             payload: false
    //         })

    //     }
    // })
    // .catch(async error => {
    //     dispatch({
    //         type: MYZOO_PICKS_FAIL,
    //         payload: error
    //     })
    //     dispatch({
    //         type: LOADING,
    //         payload: false
    //     })
    // });
    await axios.post(`home/myzoopick`, data)  
    .then(async response => {
        if(response.data.status){

            dispatch({
                type: MYZOO_PICKS_SUCCESS,
                payload: response.data.data
            })
            dispatch({
                type: LOADING,
                payload: false
            })

        }else{

            dispatch({
                type: MYZOO_PICKS_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })

        }
        
    })
    .catch(async error => {
        dispatch({
            type: MYZOO_PICKS_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//MYZOOPICKS PRODUCT
export const getMyZooPicksProduct = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_getmyzoopickproductLists`, data)  
    .then(async response => {
        dispatch({
            type: MYZOOPICKS_PRODUCT_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: MYZOOPICKS_PRODUCT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


// PRODUCT BY ID
export const getProductById = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_getproductbyIds`, data)  
    .then(async response => {
        dispatch({
            type: PRODUCT_BYID_SUCCESS,
            payload: response.data
        })
        //await AsyncStorage.setItem("Product", JSON.stringify(response.data))

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: PRODUCT_BYID_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// PRODUCT LIST
export const getProductList = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/_getproductLists`, data)  
    .then(async response => {
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//LATESTPETS

export const getLatestPets = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customer/home/latestpets`, data)  
    .then(async response => {
        dispatch({
            type: LATEST_PETS_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: LATEST_PETS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//LATESTACCESSORIES
export const getLatestAccessories = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customer/home/latestaccessories`, data)  
    .then(async response => {
        dispatch({
            type: LATEST_ACCESSORIES_SUCCESS,
            payload: response.data
        })
        

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: LATEST_ACCESSORIES_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//SERVICES Type
export const getLatestServices = () => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`admin/service/_loadServicesType`)  
    .then(async response => {
        dispatch({
            type: LATEST_SERVICES_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: LATEST_SERVICES_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

export const getServices = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customer/home/latestservices`, data)  
    .then(async response => {
        dispatch({
            type: SERVICES_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SERVICES_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//CATEGORY
export const getAllCategories = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`customer/home/_getcategorybyId`, data)  
    .then(async response => {
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//SUBCATEGORY
export const getAllSubCategories = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`productManage/subcategory/list`, data)  
    .then(async response => {
        dispatch({
            type: SUBCATEGORY_LIST_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {

        dispatch({
            type: SUBCATEGORY_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//RECENT POST

export const getRecentPost = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    let url = "";

    if(data?.Type === 1){
        url = "customer/home/latestpets"
    }
    else if(data?.Type === 2){
        url="customer/home/latestaccessories"
    }
    else if(data?.Type === 3){
        url="customer/home/latestservices"
    }

    await axios.post(url, data)  
    .then(async response => {
        dispatch({
            type: RECENT_POST_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: RECENT_POST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//Get Every Ranges
export const getEveryranges = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`Front_End/Mob_products/everyranges`, data)  
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



