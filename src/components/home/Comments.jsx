import React, { useEffect, useState } from "react";
import CommentDisplay from "./comments/CommentDisplay";

const Comments = ({ post }) => {
  const [showComment, setShowComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentReply, setCommentReply] = useState([])


  const [next, setNext] = useState(2);
  console.log(next)

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComment(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  // comment reply
  useEffect(() => {
    const newCmReply = post.comments.filter((cm) => cm.reply);
    setCommentReply(newCmReply)
    console.log(newCmReply)
  }, [post.comments])

  return (
    <div className="comments">
      {showComment.map((comment, index) => (
        <CommentDisplay key={index} comment={comment} post={post} Replycm={commentReply.filter(item => item.reply === comment._id)}/>
      ))}
      {
        comments.length - next > 0 ? (
          <div 
            className="p-2 border-top"
            style={{color: "crimson", cursor: "pointer"}}
            onClick={() => setNext(next + 10)}
          >
            See more comments...
          </div>
        ) : (
          comments.length > 2 && (
            <div 
            className="p-2 border-top"
            style={{color: "crimson", cursor: "pointer"}}
            onClick={() => setNext(2)}
          >
            Hide comments...
          </div>
          )
        )
      }
    </div>
  );
};

export default Comments;
