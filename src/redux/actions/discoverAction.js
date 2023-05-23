import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalType";

export const DISCOVER_TYPES = {
  LOADING_DISCOVER: "LOADING_DISCOVER",
  GET_POSTS_DISCOVER: "GET_POSTS_DISCOVER",
  EDIT_POST_DISCOVER: "EDIT_POST_DISCOVER"
};

export const getDiscoverPosts = (token) => async dispatch => {
  try {
    dispatch({ type: DISCOVER_TYPES.LOADING_DISCOVER, payload: true })

    const res = await getDataAPI(`post_discover`, token)
    console.log(res)
    dispatch({
      type: DISCOVER_TYPES.GET_POSTS_DISCOVER,
      payload: res.data
    })
    dispatch({ type: DISCOVER_TYPES.LOADING_DISCOVER, payload: false })

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: err.response.data.msg}
    })
  }
}