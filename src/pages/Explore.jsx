import React, { useState, useContext } from "react";
import { UserContext } from "../comp/UserContext";

import { MdDeleteOutline } from "react-icons/md";

import '../explore.css';

const Explore = ({ blogPosts, removeBlog }) => {

  const [sortBy, setSortBy] = useState("newest");
  const { userName } = useContext(UserContext);

  // Function to sort blog posts based on sorting criteria and show max 3 posts
  const sortedAndLimitedBlogPosts = () => {
    if (sortBy === "newest") {
      return blogPosts.slice().sort((a, b) => b.id - a.id).slice(0, 3);
    } else {
      return blogPosts.slice().sort((a, b) => a.id - b.id).slice(0, 3);
    }
  };

  return (
    <div className="blogContainer">
          <div className="filterSection">
            <button
              className={`filterButton ${sortBy === "newest" ? "active" : ""}`}
              onClick={() => setSortBy("newest")}
            >
              Newest
            </button>
            <button
              className={`filterButton ${sortBy === "oldest" ? "active" : ""}`}
              onClick={() => setSortBy("oldest")}
            >
              Oldest
            </button>
          </div>
          {sortedAndLimitedBlogPosts().map((post) => (
            <div className="blogPost " key={post.id}>
              <h2>
                {post.title}
                {post.author === userName && (
                  <MdDeleteOutline onClick={() => removeBlog(post.id)} className="removeButton">
                    Remove
                  </MdDeleteOutline>
              )}
              </h2>
              
              <div className="blogContent">
                <h3>{post.blogText}</h3>
                <p>Author: {post.author}</p>
              </div>
            </div>
          ))}
        </div>
  )
}

export default Explore
