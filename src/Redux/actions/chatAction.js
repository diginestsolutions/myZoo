import reactotron from 'reactotron-react-native';
import axios from '../../CustomAxios'
import { 
    CHATTED_USERLIST_FAIL, 
    CHATTED_USERLIST_SUCCESS, 
    CONVERSATN_CHAT_HISTORY_FAIL, 
    CONVERSATN_CHAT_HISTORY_SUCCESS, 
    CONVERSATN_OPPONENT_LIST_FAIL, 
    CONVERSATN_OPPONENT_LIST_SUCCESS, 
    CREATE_FIRSTCHAT_FAIL, 
    CREATE_FIRSTCHAT_SUCCESS, 
    INBOX_CONTINUE_CHAT_FAIL, 
    INBOX_CONTINUE_CHAT_SUCCESS, 
    SEND_MESSAGE_FAIL, 
    SEND_MESSAGE_SUCCESS, 
    STARTCHAT_PRODUCT_DETAILS_FAIL, 
    STARTCHAT_PRODUCT_DETAILS_SUCCESS, 
    TWOUSER_CHATLIST_FAIL, 
    TWOUSER_CHATLIST_SUCCESS 
} from '../constants/chatConstant';
import { LOADING } from '../constants/homeConstant';


//CHATTED USER LIST
export const getChattedUserlist = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`api/profile/chat/messages/conversations`, data)  
    .then(async response => {
        dispatch({
            type: CHATTED_USERLIST_SUCCESS,
            payload: response.data.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: CHATTED_USERLIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//TWO USER CHAT LIST
export const getTwouserChatlist = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`api/profile/chat/messages/conversations/query`, data)  
    .then(async response => {
        dispatch({
            type: TWOUSER_CHATLIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: TWOUSER_CHATLIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//SEND MESSAGE
export const sendMessage = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`api/profile/chat/messages/conversations/create`, data)  
    .then(async response => {
        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//CONVERSATN OPPONENT LIST 
export const conversatnOppList = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`api/profile/chat/messages/conversations`, data)  
    .then(async response => {
        dispatch({
            type: CONVERSATN_OPPONENT_LIST_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: CONVERSATN_OPPONENT_LIST_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//CONVERSATN CHAT HISTORY
export const conversatnChatHistory = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`api/profile/chat/messages/conversations/query`, data)  
    .then(async response => {
        dispatch({
            type: CONVERSATN_CHAT_HISTORY_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: CONVERSATN_CHAT_HISTORY_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//STARTCHAT PRODUCT DETAILS 
export const startChatPdtDetails = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`api/profile/chat/messages/conversations/create`, data)  
    .then(async response => {
        dispatch({
            type: STARTCHAT_PRODUCT_DETAILS_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: STARTCHAT_PRODUCT_DETAILS_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//CREATE FIRST CHAT
export const firstChat = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`api/profile/chat/messages/conversations/create`, data)  
    .then(async response => {
        dispatch({
            type: CREATE_FIRSTCHAT_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: CREATE_FIRSTCHAT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//INBOX CONTINUE CHAT
export const inboxContinueChat = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`api/profile/chat/messages/conversations/inbox`, data)  
    .then(async response => {
        dispatch({
            type: INBOX_CONTINUE_CHAT_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })

    })
    .catch(async error => {

        dispatch({
            type: INBOX_CONTINUE_CHAT_FAIL,
            payload: error
        })

        dispatch({
            type: LOADING,
            payload: false
        })
    });
}