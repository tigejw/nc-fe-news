import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleComments from "./ArticleComments";
import Voting from "./Voting";

export default function Article() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [commentIsLoading, setCommentIsLoading] = useState(true);

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
                <Voting
                  articleData={articleData}
                  setArticleData={setArticleData}
                  article_id={article_id}
                />
              </div>
            </div>

            <img
              className="article-page-img"
              src={articleData.article_img_url}
            />
            <p className="article-page-body">{articleData.body}</p>
          </main>
          <ArticleComments
            totalComments={articleData.comment_count}
            commentsData={commentsData}
            setCommentsData={setCommentsData}
            article_id={article_id}
          />
        </div>
      </div>
    );
  }
}
