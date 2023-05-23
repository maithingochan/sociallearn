import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import moment from "moment";
import LikeButton from "../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import CommentMenu from "./CommentMenu";
import {
  likeComment,
  updateComment,
  unLikeComment,
} from "../../../redux/actions/conmmentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onReply, setOnReply] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  useEffect(() => {
    setContent(comment.content);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    PointerEvent: comment._id ? "inherit" : "none",
  };

  // like comment
  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };
  // unlike comment
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  // update comment
  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  // reply comment
  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link
        to={`/profile/${comment.user._id}`}
        className="d-flex text-dark text-decoration-none"
      >
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="comment_name mx-1">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              ref={(ref) => ref && ref.focus()}
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                <Avatar src={comment.tag.avatar} size="small-avatar" />{" "}{comment.tag.username}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "...."}
              </span>
              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Hide content" : "Show content"}
                </span>
              )}
            </div>
          )}

          <div style={{ cursor: "pointer" }}>
            <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />

            <small className="text-muted mr-3 ml-3">
              {moment(comment.createdAt).fromNow()}
            </small>

            <small className="font-weight-bold mr-3">
              {comment.likes.length} likes
            </small>

            {onEdit ? (
              <>
                <small className="font-weight-bold mr-3" onClick={handleUpdate}>
                  update
                </small>
                <small
                  className="font-weight-bold mr-3"
                  onClick={() => setOnEdit(false)}
                >
                  cancel
                </small>
              </>
            ) : (
              <small className="font-weight-bold mr-3" onClick={handleReply}>
                {onReply ? "Cancel" : "Reply"}{" "}
              </small>
            )}
          </div>
        </div>

        <div
          style={{
            alignSelf: "flex-start",
            paddingTop: "5px",
            cursor: "pointer",
          }}
        >
          <CommentMenu
            post={post}
            comment={comment}
            setOnEdit={setOnEdit}
          />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            <Avatar src={onReply.user.avatar} size="small-avatar" />{" "}
            {onReply.user.username}
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
