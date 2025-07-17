import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import getPost from "../../scripts/getPost.js";
import Comments from "../Comments/Comments.jsx";
import CreateComment from "../CreateComment/CreateComment.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import styles from "./Post.module.css";
import formatDateTime from "../../scripts/formatDateTime.js";

function Post() {
  const { user } = useOutletContext();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(async () => {
    const newPost = await getPost(postId);
    setPost(newPost);
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) {
    return (
      <main>
        <Spinner />
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <div className={styles.post} key={post.id}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.author}>
          Posted by: <span className={styles.span}>{post.User.username}</span>
        </p>
        <hr className={styles.hrThin} />
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: post.text }}
        />
        <hr className={styles.hrThin} />
        <p className={styles.date}>
          Posted on:{" "}
          <span className={styles.span}>{formatDateTime(post.created)}</span>
        </p>

        <hr className={styles.hr} />
        {post.comments.length > 0 ? (
          <Comments
            comments={post.comments}
            user={user}
            post={post}
            commentDeleted={fetchPost}
          />
        ) : (
          <p className={styles.noComments}>This post has no comments.</p>
        )}
      </div>

      {user ? (
        <CreateComment postId={postId} commentCreated={fetchPost} />
      ) : (
        <p className={styles.loggedInAlert}>
          You need to be Logged in to comment!
        </p>
      )}
      <Link className={styles.link} to="/">
        Go to Home Page
      </Link>
    </main>
  );
}

export default Post;
