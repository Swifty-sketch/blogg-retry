import {useState, useEffect} from "react"
import Navbar from "./comp/Navbar"
import Explore from "./pages/Explore"
import Hero from "./comp/Hero"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "./comp/UserContext";

function App() {

  const blogPosts = [
    { id: 1, blogText: "Suppose I'm looking at a sentence of Hausa, Yoruba, or Igbo that has been transliterated into English. How can I tell which it is? I know how to do this for most European languages, for Mandarin, Cantonese, Japanese, Korean, etc., but I don't know Yoruba from Igbo.", author: "John Doe" },
    { id: 2, blogText: "This is the second blog post.", author: "Jane Smith" },
    { id: 3, blogText: "This is the third blog post.", author: "Alice Johnson" }
  ];

  const { isLoggedIn } = useContext(UserContext);

  return (
    <Router>
      <Navbar />
      {isLoggedIn ? (
        <Switch>
          {/*Home*/}
          <Route exact path="/">
            {/*Props*/}
            <Hero blogPosts={blogPosts} />
          </Route>
          <Route path="/Explore">
            <Explore />
          </Route>
        </Switch>
      ) : (
        console.log("please log in.")
      )}
    </Router>
  );
}

export default App;
