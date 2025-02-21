import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Filters from "./ Filters";
import { useNavigate } from "react-router";
export default function Home() {
  const [articlesData, setArticlesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  function handleErrorNav(error) {
    nav("/error", { state: error.message });
  }

  useEffect(() => {
    let url = `https://nc-news-ctm3.onrender.com/api/articles`;
    setIsLoading(true);

    const params = new URLSearchParams();
    if (sortByQuery) params.append("sort_by", sortByQuery);
    if (orderQuery) params.append("order", orderQuery);

    if (params) {
      url += `?${params}`;
    }

    axios
      .get(url)
      .then(({ data: { articles } }) => {
        setArticlesData(articles);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [sortByQuery, orderQuery]);

  if (isLoading) {
    return <p>Loading!</p>;
  } else if (error) {
    handleErrorNav(error);
  } else {
    return (
      <>
        <Filters />
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
