import auth from './AuthReducer'
import { combineReducers } from 'redux'
import posts from './postReducer'

export default combineReducers({ posts, auth })
