import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import Reactotron from '../ReactotronConfig'
import thunk from 'redux-thunk'
import { homeReducer } from './reducers/homeReducer';
import { settingsReducer } from './reducers/settingsReducer';
import { authReducer } from './reducers/authReducer';
import { orderReducer } from './reducers/orderReducer';
import { cartReducer } from './reducers/cartReducer';
import { myItemsReducer } from './reducers/myItemsReducer';
import { RESET_USER } from './constants/authConstant';
import { chatReducer } from './reducers/chatReducer';


//import reducers


const appReducer = combineReducers({
    home: homeReducer,
    settings: settingsReducer,
    auth: authReducer,
    order : orderReducer,
    cart : cartReducer,
    myItems : myItemsReducer,
    chat : chatReducer
})

const reducer = (state, action) => {
    if (action.type === RESET_USER) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

const middleware = [ thunk ];


const store = createStore(reducer, compose(applyMiddleware(...middleware), Reactotron.createEnhancer()));

export default store; 