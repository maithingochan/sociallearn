import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/conmmentAction";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!content.trim()) {
      if (setOnReply)
       return setOnReply(false)
      return
    }
    console.log(post)
    setContent('')
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user
    }
    console.log(newComment)
    dispatch(createComment({post, newComment, auth}))
    if (setOnReply)
       return setOnReply(false)
  }

  console.log({children})
  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Adds your comments..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default InputComment;
