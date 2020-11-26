import "./App.css";
import { db, auth } from "./firebase";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import pf from "./pf_circle.png";
import "./App.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    
    db.collection("posts").onSnapshot((snapshot) => {
      if (snapshot.docs.length==0) {
         console.log("No elements")
      }
      else{
        console.log("elements")
      }
      //every time the db changes ittakes a snapshot
      setPosts(snapshot.docs.map((doc) => doc.data()
      ));
    });
  }, []);

  const SignUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };
  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src={pf} height="70" width="70" />
              <br></br>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br></br>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <Button type="submit" onClick={SignUp}>
                Signup
              </Button>
              <Button type="submit" onClick={login}>
    login
              </Button>
            </center>
          </form>
        </div>
      </Modal>
      <h1 className="app__signup">bllss</h1>
      <ImageUpload />
      {posts.map((post) => (
        <h1>
          {post.username}
          <br />
        
          {post.caption}
        </h1>
      ))}
      <Button onClick={() => setOpen(true)}>SignUp</Button>
    </div>
  );
}

export default App;
