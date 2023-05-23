import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const Posts = () => {
  const { homePosts, theme, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);

  // const [pageNumber, setPageNumber] = useState(3);

  // console.log(pageNumber);

  // // const [load, setLoad] = useState(false);

  // const handleLoadMore = async (pageNumber) => {
  //   setLoading(true);
  //   const res = await getDataAPI(
  //     `posts?limit=3&page=${pageNumber}`,
  //     auth.token
  //   );
  //   console.log(res);
  //   dispatch({
  //     type: POST_TYPES.GET_MORE_POST,
  //     payload: {
  //       ...res.data,
  //       page: homePosts.page,
  //       result: homePosts.result + res.data.result,
  //     },
  //   });
  //   setLoading(false)
  // };

  // useEffect(() => {
  //   handleLoadMore(pageNumber);
  // }, [pageNumber]);

  // const loadMore = () => {
  //   setPageNumber((prevPageNumber) => prevPageNumber + 1);
  // };

  // const pageEnd = useRef();
  // useEffect(() => {
  //   if (loading) {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting) {
  //           loadMore();
  //         }
  //       },
  //       { threshold: 1 }
  //     );
  //     observer.observe(pageEnd.current);
  //   }
  // }, [loading]);

  //buttonBar will  contain the bottonBar JSX element

  const [commentIncrement, setCommentIncrement] = useState(2);

  const commentIncrementRef = useRef(commentIncrement);

  // Ensure comment increament is up to date
  useEffect(() => {
    commentIncrementRef.current = commentIncrement;
  }, [commentIncrement]);

  const [showButtonBar, setShowButtonBar] = useState(true);

  //buttonBar will  contain the bottonBar JSX element
  const [bottonBar, setBottonBar] = useState(null);

  useEffect(() => {
    const currentBottonBar = bottonBar;
    const currentObserver = observer.current;
    if (currentBottonBar) {
      currentObserver.observe(currentBottonBar);
    }

    return () => {
      if (currentBottonBar) {
        currentObserver.unobserve(currentBottonBar);
      }
    };
  }, [bottonBar]);

  //Intersection Observer
  const observer = React.useRef(
    new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const res = await getDataAPI(
          `posts?limit=3&page=${commentIncrementRef.current}`,
          auth.token
        );
        if (res.data.posts.length) {
            dispatch({
              type: POST_TYPES.GET_MORE_POST,
              payload: {
                ...res.data,
                page: commentIncrement + 1,
                result: commentIncrement.result + res.data.result,
              },
            });
        } else {
            setShowButtonBar(false);
        }

        setCommentIncrement((prevState) => (prevState += 1));
      }
    }),
    { threshold: 1 }
  );

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {showButtonBar ? (
        <div className="bottomBar" ref={setBottonBar}>
          <div className="loader"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Posts;
