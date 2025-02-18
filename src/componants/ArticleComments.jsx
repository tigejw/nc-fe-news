import Voting from "./Voting";

export default function ArticleComments({
  articleData,
  setArticleData,
  totalComments,
  commentsData,
  setCommentsData,
}) {
  return (
    <>
      <h3 className="comments-header">{totalComments || 0} Comments:</h3>
      <p>Comment bar here post!!:D</p>
      {totalComments ? (
        <ul>
          {commentsData.map((comment) => {
            return (
              <div className="comment-card" key={comment.comment_id}>
                <h5 className="comment-author">{comment.author}</h5>
                <p className="comment-date">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
                <p className="comment-body">{comment.body}</p>
                <Voting
                  commentsData={commentsData}
                  comment_id={comment.comment_id}
                  articleData={articleData}
                  setArticleData={setArticleData}
                  setCommentsData={setCommentsData}
                />
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
