import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../redux/actions/conmmentAction";

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({post, auth, comment}))
    }
  }

  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
          <span className="material-icons">create</span>Edit
        </div>
        <div className="dropdown-item" onClick={handleRemove}>
          <span className="material-icons">delete_outline</span>Remove
        </div>
      </>
    );
  };

  return (
    <div>
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div className="nav-item dropdown">
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_vert
          </span>

          <div className="dropdown-menu" aria-labelledby="moreLink">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem() // Trả về MenuItem nếu người đăng nhập cùng là tác giả của post và comment
              ) : (
                <div className="dropdown-item">
                  <span className="material-icons">delete_outline</span> Remove
                </div> // Trả về một div chứa MenuItem Remove nếu người đăng nhập là tác giả của post nhưng không phải tác giả của comment
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem() // Nếu người đăng nhập không phải là tác giả của post, chỉ trả về MenuItem nếu người đăng nhập là tác giả của comment
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
