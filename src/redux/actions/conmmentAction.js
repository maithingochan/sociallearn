import { deleteDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { DeleteData, EditData, GLOBALTYPES } from './globalType'
import { POST_TYPES } from './postAction'

export const createComment = ({post, newComment, auth}) => async dispatch => {
  const newPost = { ...post, comments: [...post.comments, newComment]}
  console.log(newComment)
  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  })
  try {
    const data = {...newComment,postId: post._id, postUserId: post.user._id}
    console.log(data)
    const res = await postDataAPI('comment', data, auth.token)
    console.log(res)

    const newData = {...res.data.newComment, user: auth.user}
    const newPost = {...post, comments: [...post.comments, newData]}
    console.log(newData)
    console.log(newPost)

    dispatch({ 
      type: POST_TYPES.EDIT_POST,
      payload: newPost
    })
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: error.response.data.msg}
    })
  }
}

export const updateComment = ({comment, post, content, auth}) => async dispatch => {
  console.log({comment, post, content, auth})
  const newComments = EditData(post.comments, comment._id, {...comment, content})
  console.log(newComments)
  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newComments
  }) 
  try {
    await patchDataAPI(`comment/${comment._id}`, { content }, auth.token)
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: error.response.data.msg}
    })
  }
}

export const likeComment = ({comment, post, auth}) => async dispatch => {
  const newComment = {...comment, likes: [...comment.likes, auth.user]}
  console.log(newComment)
  const newComments = EditData(post.comments, comment._id, newComment)
  console.log(newComments)
  const newPost = { ...post, comments: newComments}
  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  })

  try {
    const res = await patchDataAPI(`comment/${comment._id}/like`, null, auth.token)
    console.log(res)
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: error.response.data.msg}
    })
  }
}

export const unLikeComment = ({comment, post, auth}) => async dispatch => {
  const newComment = { ...comment, likes: DeleteData(comment.likes,  auth.user._id)}
  console.log(newComment)
  console.log(comment.likes)

  const newComments = EditData(post.comments, comment._id, newComment)
  const newPost = { ...post, comments: newComments}

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  })
  try {
    const res = await patchDataAPI(`/comment/${comment._id}/unlike`, null, auth.token)
    console.log(res)
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: error.response.data.msg}
    })
  }
}

export const deleteComment = ({post, auth, comment}) => async dispatch => {
  const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment]

  const newPost = {
    ...post,
    comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
  }

  console.log({deleteArr, newPost})

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  })

  try {
    deleteArr.forEach(item =>
       deleteDataAPI(`delete/${item._id}`, auth.token)
      )
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: error.response.data.msg}
    })
  }
}