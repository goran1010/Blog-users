import { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import getPost from "../../scripts/getPost.js";
import Comments from "../Comments/Comments.jsx";
import CreateComment from "../CreateComment/CreateComment.jsx";

function Post() {
  const { user } = useOutletContext();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  useEffect(() => {
    async function fetchPost() {
      const newPost = await getPost(postId);
      setPost(newPost);
      setLoading(false);
      console.log(newPost);
    }
    fetchPost();
  }, [postId]);

  if (loading) {
    return <main>Loading...</main>;
  }
  return (
    <main>
      <div className="post">
        <h1>{post.title}</h1>
        <p>{post.User.username}</p>
        <p>{post.text}</p>
        <p>{post.created}</p>
        {post.comments.length > 0 ? (
          <Comments comments={post.comments} />
        ) : (
          <p>No comments here.</p>
        )}
      </div>
      {user ? (
        <CreateComment postId={postId} />
      ) : (
        <p>You need to be Logged in to comment!</p>
      )}
      <Link to="/">Go to Home Page</Link>
    </main>
  );
}

export default Post;
