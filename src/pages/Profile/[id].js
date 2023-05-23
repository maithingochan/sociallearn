import React, { useEffect, useState } from "react";
import Info from "../../components/profile/Info";
import Post from "../../components/profile/Post";
import { useDispatch, useSelector } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import Saved from "../../components/profile/Saved";
const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const [saveTab, setSaveTab] = useState(false);

  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.ids.every((item) => id !== item)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [dispatch, profile, id, auth]);

  return (
    <div className="profile">
      <Info id={id} auth={auth} dispatch={dispatch} profile={profile} />

      {auth.user._id === id && (
        <div className="profile_tab">
          <button
            className={saveTab ? "" : "active"}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={saveTab ? "active" : ""}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}
      {profile.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block my-4 mx-auto " />
      ) : (
        <>
          {saveTab ? (
            <Saved auth={auth} dispatch={dispatch} />
          ) : (
            <Post id={id} auth={auth} dispatch={dispatch} profile={profile} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
