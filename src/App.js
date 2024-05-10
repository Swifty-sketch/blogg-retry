import { useState, useEffect } from "react";
import Navbar from "./comp/Navbar";
import Hero from "./comp/Hero";
import Explore from "./pages/Explore";
import MakeBlogg from "./pages/MakeBlogg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./comp/UserContext";
import blogData from "./blogData.json"; // Importing the JSON file

function App() {
  const [blogPosts, setBlogPosts] = useState(
    JSON.parse(localStorage.getItem("blogPosts")) || blogData // Using imported data
  );

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  const addComment = (postId, comment) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), comment] } : post
      )
    );
  };

  const removeComment = (postId, commentIndex) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter((_, index) => index !== commentIndex) }
          : post
      )
    );
  };

  const removeBlog = (id) => {
    const updatedBlogs = blogPosts.filter((blog) => blog.id !== id);
    setBlogPosts(updatedBlogs);
  };

  return (
    <Router>
      <Navbar />
      {isLoggedIn ? (
        <Switch>
          {/* Home */}
          <Route exact path="/">
            {/* Props */}
            <Hero blogPosts={blogPosts} removeBlog={removeBlog} addComment={addComment} />
          </Route>
          <Route path="/Explore">
            <Explore
              blogPosts={blogPosts}
              removeBlog={removeBlog}
              addComment={addComment}
              removeComment={removeComment}
            />
          </Route>
          <Route path="/MakeBlogg">
            <MakeBlogg
              onAddBlog={(newBlog) => {
                setBlogPosts([...blogPosts, { id: blogPosts.length + 1, ...newBlog }]);
              }}
            />
          </Route>
        </Switch>
      ) : (
        alert("Not logged in")
      )}
    </Router>
  );
}

export default App;
