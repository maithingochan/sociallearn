import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Follower from "./Follower";
import Following from "./Following";
import { GLOBALTYPES } from "../../redux/actions/globalType";

const Info = ({id, auth, profile, dispatch}) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  console.log({ auth, profile });

  useEffect(() => {
    if (id === auth?.user?._id) {
      setUserData([auth?.user]);
    } else {
      console.log({ users: profile.users });

      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (follower && following && onEdit) {
      dispatch({ type: GLOBALTYPES.MODEL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODEL, payload: false });
    }
  }, [follower, following, onEdit, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />

          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
            <div className="follow_btn">
              <span className="mr-4" onClick={() => setFollower(true)}>
                {user.followers.length} Followers
              </span>
              <span className="ml-4" onClick={() => setFollowing(true)}>
                {user.following.length} Following
              </span>
            </div>
            <h6>
              {user.fullname} <span className="text-danger">{user.mobile}</span>
            </h6>
            <p className="m-0">{user.address}</p>
            <h6 className="m-0">{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
          {follower && (
            <Follower users={user.followers} setFollower={setFollower} />
          )}
          {following && (
            <Following users={user.following} setFollowing={setFollowing} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
