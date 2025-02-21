import axios from "axios";
import { useState } from "react";
export default function DeleteMe({ comment_id, setCommentsData }) {
  const [failedDelete, setFailedDelete] = useState(false);
  function deleteComment() {
    axios
      .delete(`https://nc-news-ctm3.onrender.com/api/comments/${comment_id}`)
      .then(() => {
        setCommentsData((comments) => {
          const commentsCopy = [...comments];
          return commentsCopy.filter(
            (comment) => comment.comment_id !== comment_id
          );
        });
      })
      .catch(() => {
        setFailedDelete(true);
      });
  }

  return (
    <>
      <button className="delete-me" onClick={deleteComment}>Delete Me</button>
      {failedDelete ? (
        <p>Sorry! Couldn't complete that request, please try again later!</p>
      ) : null}
    </>
  );
}
