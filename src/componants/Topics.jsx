import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
export default function Topics() {
  const [topicsData, setTopicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://nc-news-ctm3.onrender.com/api/topics")
      .then(({ data: { topics } }) => {
        setTopicsData(topics);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <>Loading!</>;
  } else {
    return (
      <>
        <ul>
          {topicsData.map((topic) => {
            return (
              <div className="topic-card" key={topic.slug}>
                <Link
                  to={`/topics/${topic.slug}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <h3 className="topic-slug">{topic.slug}</h3>
                  <p className="topic-description">{topic.description}</p>
                </Link>
              </div>
            );
          })}
        </ul>
      </>
    );
  }
}
