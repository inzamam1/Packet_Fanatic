import "./App.css";
import { db } from "./firebase";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      //every time the db changes ittakes a snapshot
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <div className="App">
      <ImageUpload />
      {posts.map((post) => (
        <h1>
          {post.username}
          <br />
          {post.caption}
        </h1>
      ))}
    </div>
  );
}

export default App;
