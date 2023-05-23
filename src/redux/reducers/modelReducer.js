import { GLOBALTYPES } from "../actions/globalType";

const initialState = false

const modelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.MODEL:
      return action.payload;
    default: 
      return state;
  }
}

export default modelReducer