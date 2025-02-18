import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
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
              return (
                <div className="article-card" key={article.article_id}>
                  <Link
                    to={`/article/${article.article_id}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <p className="article-topic">{article.topic}</p>
                    <div className="content">
                      <h3 className="article-title">{article.title}</h3>
                      <img
                        className="aritcle-img"
                        src={article.article_img_url}
                      />
                    </div>
                    <div className="info">
                      <p className="article-author">{article.author}</p>
                      <p className="article-comments-count">
                        Comments: {article.comment_count}
                      </p>
                      <p className="article-votes">Votes: {article.votes}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </ul>
        </main>
      </>
    );
  }
}
