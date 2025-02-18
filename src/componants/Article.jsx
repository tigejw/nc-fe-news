import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleComments from "./ArticleComments";

export default function Article() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [commentIsLoading, setCommentIsLoading] = useState(true);
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

  useEffect(() => {
    axios
      .get(`https://nc-news-ctm3.onrender.com/api/articles/${article_id}`)
      .then(({ data: { article } }) => {
        setArticleData(article);
      })
      .finally(() => {
        setArticleIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "ERRROR");
      });
    axios
      .get(
        `https://nc-news-ctm3.onrender.com/api/articles/${article_id}/comments`
      )
      .then(({ data: { comments } }) => {
        setCommentsData(comments);
      })
      .finally(() => {
        setCommentIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "ERROR");
      });
  }, []);

  if (articleIsLoading || commentIsLoading) {
    return <p>Loading!</p>;
  } else {
    return (
      <div>
        <div className="article-page">
          <main>
            <div className="article-page-infocard">
              <p className="article-page-topic">{articleData.topic}</p>
              <h3 className="article-page-title">{articleData.title}</h3>
              <div className="article-page-undertitle">
                <p className="article-page-author">{articleData.author}</p>
                <p className="article-page-date">
                  {new Date(articleData.created_at).toLocaleString()}
                </p>
                <div className="vote-box">
                  <button
                    className="upvote"
                    onClick={() => {
                      handleVotes(1);
                    }}
                  >
                    ↑
                  </button>
                  <p className="article-page-votes">
                    Votes: {articleData.votes}
                  </p>
                  <button
                    className="downvote"
                    onClick={() => {
                      handleVotes(-1);
                    }}
                  >
                    ↓
                  </button>
                </div>
              </div>
            </div>

            <img
              className="article-page-img"
              src={articleData.article_img_url}
            />
            <p className="article-page-body">{articleData.body}</p>
          </main>
          <ArticleComments
            handleVotes={handleVotes}
            updateCommentVote={updateCommentVote}
            totalComments={articleData.comment_count}
            commentsData={commentsData}
          />
        </div>
      </div>
    );
  }
}
