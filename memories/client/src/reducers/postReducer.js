import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH 
} from '../constants/actionTypes'

const postReducer = (posts= [], action) => {
  switch (action.type) {
    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )

    case DELETE:
      return posts.filter((post) => post._id !== action.payload)
    case FETCH_ALL:
      return {
        ...posts,
       posts:action.payload.data,
       currentPage: action.payload.currentPage,
       numberOfPages:action.payload.numberOfPages
      }
      case FETCH_BY_SEARCH:
      return {
        ...posts,
        posts:action.payload
      }
    case CREATE:
      return [...posts, action.payload]
    default:
      return posts
  }
}
export default postReducer
