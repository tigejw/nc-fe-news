import { Link } from "react-router";
export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <Link
        to={`/article/${article.article_id}`}
        style={{ color: "white", textDecoration: "none" }}
      >
        <p className="article-topic">{article.topic}</p>
        <div className="content">
          <h3 className="article-title">{article.title}</h3>
          <img className="aritcle-img" src={article.article_img_url} />
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
}
