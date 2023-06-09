import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DISCOVER_TYPES,
  getDiscoverPosts,
} from "../redux/actions/discoverAction";
import PostThumn from "../components/PostThumn";
import LoadIcon from "../images/loading.gif";
import LoadMoreBtn from "../components/LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const [load, setLoad] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?num=${discover.page * 9}`,
      auth.token
    );
    dispatch({
      type: DISCOVER_TYPES.EDIT_POST_DISCOVER,
      payload: res.data,
    });
    setLoad(false);
  };

  return (
    <div>
      {discover.loading ? (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto my-4" />
      ) : (
        <PostThumn posts={discover.posts} result={discover.result} />
      )}
      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      {!discover.loading && (
        <LoadMoreBtn
          page={discover.page}
          result={discover.result}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default Discover;
