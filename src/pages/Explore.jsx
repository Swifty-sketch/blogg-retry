import React, { useState, useContext } from "react";
import { UserContext } from "../comp/UserContext";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import "../explore.css";

const Explore = ({ blogPosts, removeBlog, editBlog }) => {
  const [sortBy, setSortBy] = useState("newest");
  const { userName } = useContext(UserContext);
  const [editablePostId, setEditablePostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [comments, setComments] = useState({});

  const sortedAndLimitedBlogPosts = () => {
    if (sortBy === "newest") {
      return blogPosts.sort((a, b) => b.id - a.id);
    } else {
      return blogPosts.sort((a, b) => a.id - b.id);
    }
  };

  const handleEdit = (postId, text) => {
    setEditablePostId(postId);
    setEditedText(text);
  };

  const handleSave = (postId) => {
    editBlog(postId, editedText);
    setEditablePostId(null);
  };

  const handleKeyPress = (event, postId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave(postId);
    }
  };

  const handleCommentChange = (postId, event) => {
    const { value } = event.target;
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (postId) => {
    const commentContent = comments[postId];
    if (commentContent) {
      const commentSection = document.querySelector(
        `.commentSection[data-postid="${postId}"]`
      );
      if (commentSection) {
        // Create a div element to wrap the comment
        const commentWrapper = document.createElement("div");
        commentWrapper.classList.add("commentWrapper");

        // Create and append username and comment paragraph elements to the wrapper
        const h2 = document.createElement("h2");
        h2.textContent = userName;
        commentWrapper.appendChild(h2);

        const p = document.createElement("p");
        p.textContent = commentContent;
        commentWrapper.appendChild(p);

        // Append the comment wrapper to the comment section
        commentSection.appendChild(commentWrapper);
      }
      // Clear comment field after submission
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: "",
      }));
    }
  };

  return (
    <div className="heroContent">
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
                  <MdDeleteOutline
                    onClick={() => removeBlog(post.id)}
                    className="removeButton"
                  >
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
                  onKeyDown={(e) => handleKeyPress(e, post.id)}
                />
              ) : (
                <h3>{post.blogText}</h3>
              )}
              <p>Author: {post.author}</p>

              <textarea
                value={comments[post.id] || ""}
                onChange={(event) => handleCommentChange(post.id, event)}
                placeholder="Leave a comment..."
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                disabled={!comments[post.id]}
              >
                Submit
              </button>
            </div>
            <div className="commentSection" data-postid={post.id}>
              <h1>Comments:</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
