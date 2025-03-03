import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router";
export default function Topic() {
  const { topic_slug } = useParams();
  const [articlesData, setArticlesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  function handleErrorNav(error) {
    nav("/error", { state: error.message });
  }

  useEffect(() => {
    axios
      .get("https://nc-news-ctm3.onrender.com/api/articles")
      .then(({ data: { articles } }) => {
        setArticlesData(articles);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (isLoading) {
    return <p>Loading!</p>;
  } else if (error) {
    handleErrorNav(error);
  } else {
    return (
      <>
        <h3 className="topic-title">{topic_slug}</h3>
        <ul>
          {articlesData.map((article) => {
            return article.topic === topic_slug ? (
              <ArticleCard article={article} key={article.article_id} />
            ) : null;
          })}
        </ul>
      </>
    );
  }
}
