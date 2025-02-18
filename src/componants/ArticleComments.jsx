export default function ArticleComments({
  handleVotes,
  updateCommentVote,
  totalComments,
  commentsData,
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
                <div className="comment-vote-box">
                  <button
                    className="upvote"
                    onClick={() => {
                      handleVotes(1, comment.comment_id);
                    }}
                  >
                    ↑
                  </button>
                  <p className="comment-votes">Votes: {comment.votes}</p>
                  <button
                    className="downvote"
                    onClick={() => {
                      handleVotes(-1, comment.comment_id);
                    }}
                  >
                    ↓
                  </button>
                </div>
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
