import { useContext, useState, setState } from "react";
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
      .then(({ data: { comment } }) => {
        revertOptimisticRendering();
        setCommentsData((comments) => {
          return [comment, ...comments];
        });
      })
      .catch((err) => {
        //add ensure you are logged in!
        revertOptimisticRendering();
      }),
      [];
  }

  function updateComments() {
    setCommentsData((comments) => {
      return [
        {
          author: username,
          body: tempComment,
          votes: 0,
          created_at: Date.now(),
        },
        ...comments,
      ];
    });
  }

  function revertOptimisticRendering() {
    setCommentsData((comments) => {
      return comments.slice(1);
    });
    //add error handling message
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} id="comment-form">
        <label htmlFor="new-comment">Join the discussion: </label>
        <br></br>
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
