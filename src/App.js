import { useState, useEffect } from "react";
import Navbar from "./comp/Navbar";
import Hero from "./comp/Hero";
import Explore from "./pages/Explore";
import MakeBlogg from "./pages/MakeBlogg";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./comp/UserContext";

function App() {
  const [blogPosts, setBlogPosts] = useState(
    JSON.parse(localStorage.getItem("blogPosts")) || [
      { id: 1, blogText: "Suppose I'm looking at a sentfrom Igbo.Suppose I'm looking at a sentfrom Igbo.Suppose I'm looking at a sentfrom Igbo.Suppose I'm looking at a sentfrom Igbo.", author: "John Doe", title: "Title 1" },
      { id: 2, blogText: "This is the second blog post.", author: "Jane Smith", title: "How to make pasta" },
      { id: 3, blogText: "This is the third blog post.", author: "Alice Johnson", title: "Lottery winner loses money in 1 week" }
    ]
  );

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  const addNewBlog = (newBlog) => {
    setBlogPosts([...blogPosts, { id: blogPosts.length + 1, ...newBlog }]);
  };

  const removeBlog = (id) => {
    const updatedBlogs = blogPosts.filter(blog => blog.id !== id);
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
            <Hero blogPosts={blogPosts} removeBlog={removeBlog} />
          </Route>
          <Route path="/Explore">
          <Explore blogPosts={blogPosts} removeBlog={removeBlog}/>
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
