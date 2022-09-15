import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import combineReducer from './reducers'


const middleware = [thunk]

export default createStore(combineReducer,composeWithDevTools(applyMiddleware(...middleware)))