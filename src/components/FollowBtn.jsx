import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const [load, setLoad] = useState(false);

  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    setFollowed(true);

    console.log("follow", { users: profile.users, user, auth });
    await dispatch(follow({ users: profile.users, user, auth }));
  };

  const handleUnFollow = async () => {
    setFollowed(false);

    await dispatch(unfollow({ users: profile.users, user, auth }));
  };
  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handleUnFollow}>
          UnFollow
        </button>
      ) : (
        <button className="btn btn-outline-info" onClick={handleFollow}>
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
