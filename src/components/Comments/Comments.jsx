export default function Comments({ comments }) {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <p>{comment.text}</p>
      ))}
    </div>
  );
}
