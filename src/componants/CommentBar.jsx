import { useContext, useState } from "react";
import { UsernameContext } from "../contexts/Username";
import axios from "axios";
export default function CommentBar({ article_id, setCommentsData }) {
  const { username } = useContext(UsernameContext);
  const [tempComment, setTempComment] = useState("");

  function handleSubmit(e) {
    updateComments();
    e.preventDefault();
    axios
      .post(
        `https://nc-news-ctm3.onrender.com/api/articles/${article_id}/comments`,
        { username: username, body: tempComment }
      )
      .then(() => {
        this.forceUpdate();
      })
      .catch((err) => {
        revertOptimisticRendering();
      });
  }

  function updateComments() {
    setCommentsData((comments) => {
      const commentsCopy = structuredClone(comments);
      commentsCopy.unshift({
        author: username,
        body: tempComment,
        votes: "n/a",
        created_at: Date.now(),
      });
      return commentsCopy;
    });
  }

  function revertOptimisticRendering() {
    setCommentsData((comments) => {
      const commentsCopy = structuredClone(comments);
      commentsCopy.shift();
      return commentsCopy;
    });
    //add error handling message
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} id="comment-form">
        <label htmlFor="new-comment">Join the discussion: </label>
        <input
          id="new-comment"
          value={tempComment}
          type="text"
          onChange={(e) => {
            setTempComment(e.target.value);
          }}
        ></input>
        <button id="comment-submit" type="submit">
          Post!
        </button>
      </form>
    </div>
  );
}
