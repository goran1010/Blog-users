import formatDateTime from "../../scripts/formatDateTime.js";
import styles from "./Comments.module.css";

export default function Comments({ comments }) {
  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div className={styles.comment} key={comment.id}>
          <p className={styles.author}>
            Commented by:{" "}
            <span className={styles.span}>{comment.User.username}</span>
          </p>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          <p className={styles.date}>
            Commented on:{" "}
            <span className={styles.span}>
              {formatDateTime(comment.created)}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
