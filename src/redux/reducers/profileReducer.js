import { EditData } from "../actions/globalType";
import { PROFILE_TYPES } from "../actions/profileAction";

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: []
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case PROFILE_TYPES.GET_USER:
      // console.log(action.payload)
      return {
        ...state,
        users: [...state.users, action.payload.user]
      }
    case PROFILE_TYPES.FOLLOW:
      console.log(state)
      return {
        ...state,
        users: state.users.map(user => (
          user._id === action.payload._id ? action.payload : user
        ))
      }
    case PROFILE_TYPES.UNFOLLOW:
      console.log(state)
      return {
        ...state,
        users: state.users.map(user => (
          user._id === action.payload._id ? action.payload : user
        ))
      }
    case PROFILE_TYPES.GET_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload]
      }
    case PROFILE_TYPES.GET_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
      case PROFILE_TYPES.EDIT_POST_PROFILE:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload)
      }
    default: 
      return state
  }
}

export default profileReducer