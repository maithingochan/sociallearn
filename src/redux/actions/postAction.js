import { GLOBALTYPES } from "./globalType";
import { imageUpload } from "../../utils/imageUpload";
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  EDIT_POST: "EDIT_POST",
  GET_POST: "GET_POST",
  GET_MORE_POST: "GET_MORE_POST",
  DELETE_POST: "DELETE_POST"
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });
      if (images.length > 0) media = await imageUpload(images);

      console.log(media);
      const res = await postDataAPI(
        "posts",
        { content, images: media },
        auth.token
      );
      console.log(res);

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {

  try {
    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: true,
    });

    const res = await getDataAPI("posts", token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: 2},
    });

    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const newImgUrl = images.filter((img) => !img.url);
    const oldImgUrl = images.filter((img) => img.url);

    console.log({ newImgUrl, oldImgUrl });
    if (
      status.content === content &&
      newImgUrl.length === 0 &&
      oldImgUrl.length === status.images.length
    )
      return;
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      if (newImgUrl.length > 0) media = await imageUpload(newImgUrl);

      const res = await patchDataAPI(
        `post/${status._id}`,
        { content, images: [...oldImgUrl, ...media] },
        auth.token
      );
      console.log(res);

      dispatch({
        type: POST_TYPES.EDIT_POST,
        payload: res.data.newPost,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({
      type: POST_TYPES.EDIT_POST,
      payload: newPost,
    });
    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const unLikePost =
  ({ post, auth }) =>
  async (dispatch) => {
    console.log(post)
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };
    console.log(newPost);
    dispatch({
      type: POST_TYPES.EDIT_POST,
      payload: newPost,
    });
    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: error.response.data.msg}
      })
    }
  };

export const getPost = ({detailPost, id , auth}) => async dispatch => {
    if (detailPost.every(post => post._id !== id)){
      try {
        const res = await getDataAPI(`post/${id}`, auth.token)
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {error: err.response.data.msg}
        })
      }
    }
}

export const deletePost = ({post, auth}) => async dispatch => {
  dispatch({
    type: POST_TYPES.DELETE_POST,
    payload: post
  })

  try {
    const res = await deleteDataAPI(`post/${post._id}`, auth.token)
    
    console.log(res)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: err.response.data.msg}
    })
  }
}

export const savePost = ({post, auth}) => async dispatch => {
  const newUser = {...auth.user, saved: [...auth.user.saved, post._id]}
  dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

  try {
    await patchDataAPI(`savePost/${post._id}`, null, auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: err.response.data.msg}
    })
  }   
}

export const unsavePost = ({post, auth}) => async dispatch => {
  const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== post._id)}
  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {...auth, user: newUser}
  })
  try {
    await patchDataAPI(`unsavePost/${post._id}`, null, auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: err.response.data.msg}
    })
  }
}