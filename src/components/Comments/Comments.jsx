export default function Comments({ comments }) {
  console.log(comments);
  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
