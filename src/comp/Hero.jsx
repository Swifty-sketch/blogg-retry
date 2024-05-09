import React, { useState } from "react";

const Hero = ({ blogPosts }) => {
  const [sortBy, setSortBy] = useState("newest"); // State to track sorting criteria

  // Function to sort blog posts based on sorting criteria
  const sortedBlogPosts = () => {
    if (sortBy === "newest") {
      return blogPosts.slice().sort((a, b) => b.id - a.id); // Sort by newest
    } else {
      return blogPosts.slice().sort((a, b) => a.id - b.id); // Sort by oldest
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
          {sortedBlogPosts().map(post => (
            <div className="blogPost" key={post.id}>
              <h3>{post.blogText}</h3>
              <p>Author: {post.author}</p>
            </div>
          ))}
        </div>

        <div className="randomTextContainer">
          <h3>News:</h3>
          <p>Drake vs Kendrick Lemar!!</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
