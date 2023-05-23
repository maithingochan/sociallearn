import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  savePost,
  unLikePost,
  unsavePost,
} from "../../../redux/actions/postAction";
import ShareModel from "../ShareModel";
import { BASE_URL } from "../../../configs/config";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme } = useSelector((state) => state);

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    setIsLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    setIsLike(false);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };
  // handle share
  const handleShare = () => {};

  //Saved post
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;
    console.log("save post");
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unsavePost({ post, auth }))
    setSaveLoad(false);
  };

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />

          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment" />
          </Link>

          <i
            className="far fa-paper-plane"
            onClick={() => setIsShare(!isShare)}
          ></i>
        </div>
        {saved ? (
          <i
            className="fas fa-bookmark text-warning"
            onClick={handleUnSavePost}
          />
        ) : (
          <i className="far fa-bookmark" onClick={handleSavePost} />
        )}
      </div>

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 34px", cursor: "pointer" }}>
          {post.likes.length}
        </h6>

        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} comments
        </h6>
      </div>
      {isShare && (
        <ShareModel url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  );
};

export default CardFooter;
