import axios from 'axios';
import { API_URL } from './config/Constants'
import reactotron from './ReactotronConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'

import store from './Redux/store'
// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const customAxios = axios.create({
    baseURL: API_URL,
    //timeout: 100000
});


// Step-2: Create request, response & error handlers
const requestHandler =async request => {
    let token = await AsyncStorage.getItem("token");

    // reactotron.log({token})
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    if(token){
        request.headers.Authorization = `Bearer ${token}`;  
    }
    
    return request;
};

const responseHandler = response => {
    /*if (response.status === 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("profileData");
        store.dispatch({
            type: RESET_USER
        })
    }*/

    return response;
};

const errorHandler = error => {
    let err="";
    if (error.response) {
        err = JSON.stringify(error.response.data.error)
        /*if(error.response.status === 403){
            
            localStorage.removeItem("user");
            localStorage.removeItem("profileData");
            store.dispatch({
                type: RESET_USER
            })
            return Promise.reject(err);
        }
        console.log(error.response.status);
        /*console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);*/
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        err = JSON.stringify(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        err = error.message;
    }
    return Promise.reject(err);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );


// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;