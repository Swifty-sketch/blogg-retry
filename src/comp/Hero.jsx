import React, { useState, useContext } from "react";
import { UserContext } from "../comp/UserContext";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import '../Hero.css';

const Hero = ({ blogPosts, removeBlog, editBlog }) => {
  const [sortBy, setSortBy] = useState("newest");
  const [editablePostId, setEditablePostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const { userName } = useContext(UserContext);

  // Function to sort blog posts based on sorting criteria and show max 3 posts
  const sortedAndLimitedBlogPosts = () => {
    if (sortBy === "newest") {
      return blogPosts.slice().sort((a, b) => b.id - a.id).slice(0, 3);
    } else {
      return blogPosts.slice().sort((a, b) => a.id - b.id).slice(0, 3);
    }
  };

  // Function to handle editing of a blog post
  const handleEdit = (postId, text) => {
    setEditablePostId(postId);
    setEditedText(text);
  };

  // Function to handle saving edited blog post
  const handleSave = (postId) => {
    editBlog(postId, editedText); // Call the editBlog function from props to save the edited text
    setEditablePostId(null);
  };

  // Function to handle key press events in the textarea
  const handleKeyPress = (event, postId) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key
      handleSave(postId); // Call the save function
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
              <h2>
                {post.title}
                {post.author === userName && (
                  <>
                    <MdDeleteOutline onClick={() => removeBlog(post.id)} className="removeButton">
                      Remove 
                    </MdDeleteOutline> 
                    {editablePostId === post.id ? (
                      <MdEdit onClick={() => handleSave(post.id)} />
                    ) : (
                      <MdEdit onClick={() => handleEdit(post.id, post.blogText)} />
                    )}
                  </>
                )}
              </h2>
              
              <div className="blogContent">
                {editablePostId === post.id ? (
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, post.id)} // Handle key events
                  />
                ) : (
                  <h3>{post.blogText}</h3>
                )}
                <p>Author: {post.author}</p>
              </div>
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
  