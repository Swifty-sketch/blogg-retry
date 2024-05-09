import {useState, useEffect} from "react"
import Navbar from "./comp/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Hero from "./comp/Hero"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "./comp/UserContext";

function App() {

  const blogPosts = [
    { id: 1, blogText: "This is the first blog post.", author: "John Doe" },
    { id: 2, blogText: "This is the second blog post.", author: "Jane Smith" },
    { id: 3, blogText: "This is the third blog post.", author: "Alice Johnson" }
  ];

  const { isLoggedIn } = useContext(UserContext);

  return (
    <Router>
      <Navbar />
      {isLoggedIn ? (
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          {/* Pass blogPosts as a prop to the Hero component */}
          <Route exact path="/">
            <Hero blogPosts={blogPosts} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      ) : (
        console.log("please log in.")
      )}
    </Router>
  );
}

export default App;
