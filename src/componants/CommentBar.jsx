import { useContext, useState, setState } from "react";
import { UsernameContext } from "../contexts/Username";
import { useNavigate } from "react-router";
import axios from "axios";
export default function CommentBar({ article_id, setCommentsData }) {
  const { username } = useContext(UsernameContext);
  const [tempComment, setTempComment] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  function handleErrorNav(error) {
    console.log(error.message);
    nav("/error", {
      state: username
        ? error.message
        : "You must be logged in to post a comment!",
    });
  }

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
        setError(err);
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
  }

  if (error) {
    handleErrorNav(error);
  } else {
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
}
