import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ Replycm, comment, post }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);
  console.log(Replycm);
  console.log(comment);

  useEffect(() => {
    setShowRep(Replycm.slice(Replycm.length - next));
  }, [Replycm, next]);

  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="pl-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {Replycm.length - next > 0 ? (
            <div
              style={{ cursor: "pointer", color: "crimson" }}
              onClick={() => setNext(next + 10)}
            >
              See more comments...
            </div>
          ) : (
            Replycm.length > 1 && (
              <div
                style={{ cursor: "pointer", color: "crimson" }}
                onClick={() => setNext(1)}
              >
                Hide comments...
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
