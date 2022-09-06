import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST
} from '../constants/actionTypes'

const postReducer = (state = {isLoading: true, posts: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true}
      case END_LOADING:
        return {...state, isLoading:false}
    case FETCH_ALL:
      return { ...state, 
       posts:action.payload.data,
       currentPage: action.payload.currentPage,
       numberOfPages:action.payload.numberOfPages
      }
      case FETCH_BY_SEARCH:
      return { ...state, posts:action.payload.data}
      case FETCH_POST:
      return { ...state,post:action.payload.post}
    case CREATE:
      return{ ...state, posts: [...state.posts, action.payload]}
      case UPDATE:
        case LIKE:
          return { ...state, posts:state.posts.map((post) =>
           ( post._id === action.payload._id ? action.payload : post ))}
    
        case DELETE:
          return { ...state, posts:state.posts.filter((post) => post._id !== action.payload)}
    default:
      return state
  }
}
export default postReducer



// Submit code by sharing github repo link, all push should have a proper commit message. Use readme.md file for deployment instructions, screenshots and code must have proper documentation.





// 1) How can u manage 10 million plus users data in your db?

// create sample db with dummy data. write system design approach.



// 2)Users data for real time dashboard (can use chart, gauge, tables) etc

// in dashboard , want to showcase DAU/WAU/MAU, Users segmentation (by country, gender, devices), top 15 users by usage time



// Customizable dashboards that let users add, remove reorder and configure tiles and which can save users with unique name for future use.

// Page should load with les than or equal to 1.5 sec

// you can use db and optimise  tables/collections structure by your own
