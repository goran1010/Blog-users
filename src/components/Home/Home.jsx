import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import getAllPosts from "../../scripts/getAllPosts.js";
import { Link } from "react-router-dom";
import formatDateTime from "../../scripts/formatDateTime.js";
import Spinner from "../Spinner/Spinner.jsx";

function Home() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    try {
      async function fetchAllPosts() {
        const newPosts = await getAllPosts();
        setAllPosts(newPosts);
      }
      fetchAllPosts();
    } catch (err) {
      //eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  return (
    <>
      <Header />
      {loadingPosts ? (
        <main>
          <Spinner />
        </main>
      ) : (
        <main>
          {allPosts.map((post) => {
            if (post.isPublished) {
              return (
                <div className="post" key={post.id}>
                  <h2>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </h2>
                  <h3>{post.User.username}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.text }} />
                  <p>{formatDateTime(post.created)}</p>
                </div>
              );
            }
          })}
        </main>
      )}
    </>
  );
}

export default Home;
