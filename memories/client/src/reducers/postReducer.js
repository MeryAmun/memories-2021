import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH 
} from '../constants/actionTypes'

const postReducer = (state= [], action) => {
  switch (action.type) {
    case UPDATE:
    case LIKE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )

    case DELETE:
      return state.filter((post) => post._id !== action.payload)
    case FETCH_ALL:
      return {
        ...state,
       posts:action.payload.data,
       currentPage: action.payload.currentPage,
       numberOfPages:action.payload.numberOfPages
      }
      case FETCH_BY_SEARCH:
      return {
        ...state,
        posts:action.payload
      }
    case CREATE:
      return [...state, action.payload]
    default:
      return state
  }
}
export default postReducer
