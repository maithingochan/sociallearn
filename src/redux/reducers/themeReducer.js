import { GLOBALTYPES } from "../actions/globalType";

const initialState = false

const themeReducer = (state = initialState, action)  => {
  switch (action.type) {
    case GLOBALTYPES.THEME:
      return action.payload;
    default:
      return false
  }
}

export default themeReducer