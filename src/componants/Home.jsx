import { useEffect, useState } from "react";
import axios from "axios";

import ArticleCard from "./ArticleCard";
export default function Home() {
  const [articlesData, setArticlesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://nc-news-ctm3.onrender.com/api/articles")
      .then(({ data: { articles } }) => {
        setArticlesData(articles);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading!</p>;
  } else {
    return (
      <>
        <div className="filters"></div>
        <main>
          <ul>
            {articlesData.map((article) => {
              return <ArticleCard article={article} key={article.article_id} />;
            })}
          </ul>
        </main>
      </>
    );
  }
}
