import "./App.css";
import { db, auth } from "./firebase";
import React, { useState, useEffect } from "react";
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
  const [signin, setOpenSignin] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("posts").onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => doc.data()));
        });
        setUser(authUser);
      } else {
        setPosts([]);
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const SignUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return db.collection("posts").doc(cred.user.uid).set({
          table: 4,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const Login = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignin(false);
  };
  

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src={pf} alt="" height="70" width="70" />
              <br></br>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

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
            </center>
          </form>
        </div>
      </Modal>
      <Modal open={signin} onClose={() => setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src={pf} alt="" height="70" width="70" />
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
              <Button type="submit" onClick={Login}>
                Login
              </Button>
            </center>
          </form>
        </div>
      </Modal>
      <h1 className="app__signup">bllsss</h1>
      <ImageUpload />
      {user ? (
        <div>
          <h4>Signed in with email-{user.email}</h4>
          <Button onClick={() => auth.signOut()}>Logout </Button>
          
          {console.log(user.id)}
          {console.log(user.email)}
          {console.log(user.uid)}
        </div>
      ) : (
        <div>
          <Button onClick={() => setOpen(true)}>SignUp</Button>
          <Button onClick={() => setOpenSignin(true)}>Login</Button>
        </div>
      )}
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
