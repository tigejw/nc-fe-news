import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Article() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [commentIsLoading, setCommentIsLoading] = useState(true);
  const fetchComments = axios.get(
    `https://nc-news-ctm3.onrender.com/api/articles/${article_id}/comments`
  );
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
  }, []);

  useEffect(() => {
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
                  <p className="article-page-votes">
                    Votes: {articleData.votes}
                  </p>
                </div>
              </div>
            </div>

            <img
              className="article-page-img"
              src={articleData.article_img_url}
            />
            <p className="article-page-body">{articleData.body}</p>
          </main>

          <h3 className="comments-header">
            {articleData.comment_count || 0} Comments:
          </h3>
          <p>Comment bar here post!!:D</p>
          {commentsData.length ? (
            <ul>
              {commentsData.map((comment) => {
                return (
                  <div className="comment-card" key={comment.comment_id}>
                    <h5 className="comment-author">{comment.author}</h5>
                    <p className="comment-date">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                    <p className="comment-body">{comment.body}</p>
                    <div className="comment-vote-box">
                      <p className="comment-votes">Votes: {comment.votes}</p>
                    </div>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>No comments yet!</p>
          )}
        </div>
      </div>
    );
  }
}
