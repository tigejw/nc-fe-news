import CommentBar from "./CommentBar";
import Voting from "./Voting";
import { useContext } from "react";
import { UsernameContext } from "../contexts/Username";
import DeleteMe from "./DeleteComment";
export default function ArticleComments({
  commentsData,
  setCommentsData,
  article_id,
}) {
  const { username } = useContext(UsernameContext);
  return (
    <>
      <h3 className="comments-header">{commentsData.length} Comments:</h3>
      <CommentBar article_id={article_id} setCommentsData={setCommentsData} />
      {commentsData.length ? (
        <ul>
          {commentsData.map((comment) => {
            return (
              <div
                className="comment-card"
                key={comment.author + comment.created_at}
              >
                <h5 className="comment-author">{comment.author}</h5>
                <p className="comment-date">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
                <p className="comment-body">{comment.body}</p>
                <Voting
                  commentsData={commentsData}
                  comment_id={comment.comment_id}
                  setCommentsData={setCommentsData}
                />
                {comment.author === username ? (
                  <DeleteMe
                    commentsData={commentsData}
                    comment_id={comment.comment_id}
                    setCommentsData={setCommentsData}
                  />
                ) : null}
              </div>
            );
          })}
        </ul>
      ) : (
        <p>No comments yet!</p>
      )}
    </>
  );
}
