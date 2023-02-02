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
} from "../constants/chatConstant"
import { LOADING, RESET_ERROR } from "../constants/homeConstant"


export  const chatReducer = (state = { }, action) => {
    switch(action.type){

        case LOADING:
            return{
                ...state,
                loading: action.payload
            }

        case CHATTED_USERLIST_FAIL:
        case TWOUSER_CHATLIST_FAIL:
        case SEND_MESSAGE_FAIL:
        case CONVERSATN_OPPONENT_LIST_FAIL:
        case CONVERSATN_CHAT_HISTORY_FAIL:
        case STARTCHAT_PRODUCT_DETAILS_FAIL:
        case CREATE_FIRSTCHAT_FAIL:
        case INBOX_CONTINUE_CHAT_FAIL:
            return{
                ...state,
                error: action.payload
            }

        case CHATTED_USERLIST_SUCCESS:
            return{
                ...state,
                chattedUser: action.payload,
            }

        case TWOUSER_CHATLIST_SUCCESS:
            return{
                ...state,
                twouserChatlist: action.payload,
            }

        case SEND_MESSAGE_SUCCESS:
            return{
                ...state,
                sendMsg: action.payload,
                productChatSuccess: true
            }

        case RESET_ERROR:
            return{
                ...state,
                error: null,
                productChatSuccess: null
            }

        case CONVERSATN_OPPONENT_LIST_SUCCESS:
            return{
                ...state,
                opponentList: action.payload,
            }
        
        case CONVERSATN_CHAT_HISTORY_SUCCESS:
            return{
                ...state,
                chatHistory: action.payload,
            }

        case STARTCHAT_PRODUCT_DETAILS_SUCCESS:
            return{
                ...state,
                chatProductDetails: action.payload,
            }
            
        case CREATE_FIRSTCHAT_SUCCESS:
            return{
                ...state,
                firstChat: action.payload,
            }

        case INBOX_CONTINUE_CHAT_SUCCESS:
            return{
                ...state,
                inboxChat: action.payload,
            }

        default:
            return state;
    }
}