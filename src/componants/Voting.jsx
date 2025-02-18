import { useState } from "react";
import axios from "axios";
export default function Voting({
  articleData,
  setArticleData,
  article_id,
  commentsData,
  comment_id,
  setCommentsData,
}) {
  const [isVoting, setIsVoting] = useState(false);

  function handleVotes(vote, comment_id) {
    if (isVoting) return;
    setIsVoting(true);

    const isArticleVote = !comment_id;

    if (isArticleVote) {
      updateArticleVote(vote);
    } else {
      updateCommentVote(vote, comment_id);
    }

    const apiCallString = isArticleVote ? "articles" : "comments";
    const apiCallID = comment_id || article_id;

    axios
      .patch(
        `https://nc-news-ctm3.onrender.com/api/${apiCallString}/${apiCallID}`,
        { inc_votes: vote }
      )
      .catch(() => {
        if (isArticleVote) {
          updateArticleVote(-vote);
        } else {
          updateCommentVote(-vote, comment_id);
        }
      })
      .finally(() => {
        setIsVoting(false);
      });
  }

  function updateArticleVote(vote) {
    setArticleData((article) => {
      const articleCopy = structuredClone(article);
      articleCopy.votes += vote;
      return articleCopy;
    });
  }

  function updateCommentVote(vote, comment_id) {
    setCommentsData((comments) => {
      const commentsCopy = structuredClone(comments);
      commentsCopy.map((comment) => {
        if (comment.comment_id === comment_id) {
          comment.votes += vote;
        }
        return comment;
      });
      return commentsCopy;
    });
  }

  return (
    <div className={comment_id ? "comment-vote-box" : "vote-box"}>
      <button
        className="upvote"
        onClick={() => {
          handleVotes(1, comment_id);
        }}
      >
        ↑
      </button>
      <p className={comment_id ? "comment-votes" : "article-page-votes"}>
        Votes:{" "}
        {commentsData
          ? commentsData.find((comment) => comment.comment_id === comment_id)
              .votes
          : articleData.votes}
      </p>
      <button
        className="downvote"
        onClick={() => {
          handleVotes(-1, comment_id);
        }}
      >
        ↓
      </button>
    </div>
  );
}
