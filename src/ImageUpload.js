import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";

function ImageUpload() {
  const [caption, setCaption] = useState("");
  const [username, setUsername] = useState("");
  const handleUpload = () => {
    db.collection("posts").add({
      caption: caption,
      username: username,
    });
    setCaption("");
    setUsername("");
  };
  const deletes = () => {
    db.collection("posts")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />

      <input
        type="text"
        placeholder="Enter a username"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
      />
      <Button onClick={handleUpload}>Upload</Button>
      <Button onClick={deletes}>Delete</Button>
    </div>
  );
}

export default ImageUpload;
