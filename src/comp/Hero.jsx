import React, { useState, useContext } from "react";
import { UserContext } from "../comp/UserContext";

const Hero = ({ blogPosts, removeBlog }) => {
  const [sortBy, setSortBy] = useState("newest"); // State to track sorting criteria
  const { userName } = useContext(UserContext);

  // Function to sort blog posts based on sorting criteria and show max 3 posts
  const sortedAndLimitedBlogPosts = () => {
    if (sortBy === "newest") {
      return blogPosts.slice().sort((a, b) => b.id - a.id).slice(0, 3); // Sort by newest and show max 3 posts
    } else {
      return blogPosts.slice().sort((a, b) => a.id - b.id).slice(0, 3); // Sort by oldest and show max 3 posts
    }
  };

  return (
    <div className="heroSection">
      <div className="heroContent">
        {/* Blog posts section */}
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
            <div className="blogPost" key={post.id}>
              {post.author === userName && ( // Check if the author matches the current user
                <button onClick={() => removeBlog(post.id)} className="removeButton">
                  Remove
                </button>
              )}
              <h2>{post.title}</h2>
              <h3>{post.blogText}</h3>
              <p>Author: {post.author}</p>
            </div>
          ))}
        </div>

        <div className="randomTextContainer">
          <h3>News:</h3>
          <p>Drake vs Kendrick Lamar!!</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
