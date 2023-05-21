import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import userDetailsReducer from '../components/userDetails/redux/userDetailsReducer'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
})
const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)))

export default store
