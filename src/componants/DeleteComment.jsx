import axios from "axios";
import { useState } from "react";
export default function DeleteMe({
  comment_id,
  commentsData,
  setCommentsData,
}) {
  const [failedDelete, setFailedDelete] = useState(false);
  function deleteComment() {
    axios
      .delete(`https://nc-news-ctm3.onrender.cm/api/comments/${comment_id}`)
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
      <button onClick={deleteComment}>Delete Me</button>
      {failedDelete ? (
        <p>Sorry! Couldn't complete that request, please try again later!</p>
      ) : null}
    </>
  );
}
