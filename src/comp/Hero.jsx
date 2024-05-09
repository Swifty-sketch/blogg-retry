import React from "react";

const Hero = ({ blogPosts }) => {
  return (
    <div className="heroSection">
      <ul>
        {blogPosts.map(post => (
          <li key={post.id}>{post.blogText} by {post.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default Hero;
