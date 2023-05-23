import React, { useEffect, useState } from 'react'
import PostThumb from '../PostThumn'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { PROFILE_TYPES } from '../../redux/actions/profileAction'
const Post = ({id, auth, dispatch, profile}) => {

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [result, setResult] = useState(9)
  const [load, setLoad] = useState(false)
  

  useEffect(() => {
    profile.posts.forEach(data => {
      if(data._id === id) {
        setPosts(data.posts)
        setResult(data.result)
        setPage(data.page)
      }
    })
  }, [profile.posts, id])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`posts_user/${id}?limit=${page * 3}`, auth.token)
    console.log(res)
    const newData = { ...res.data, page: page + 1, _id: id}
    dispatch({
      type: PROFILE_TYPES.EDIT_POST_PROFILE,
      payload: newData
    })
    setLoad(false)
  }
  
  return (
    <div>
      <PostThumb posts={posts} result={result}/>

      {
        load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
      }
{
  !load && <LoadMoreBtn result={result} page={page} load={load} handleLoadMore={handleLoadMore}/>
}
      
    </div>
  )
}

export default Post