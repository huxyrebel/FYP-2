import { useState, useEffect } from "react";
import styles from './comment.module.css'
import {Form, FormGroup, Label, Col, Input, Button, FormText} from 'reactstrap'
import { app } from "../../firebase";
import "firebase/database";

function App(){
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Load comments from Realtime Database on component mount
  useEffect(() => {
    const commentsRef = app.database().ref("comments");
    commentsRef.on("value", (snapshot) => {
      const newComments = [];
      snapshot.forEach((childSnapshot) => {
        newComments.push(childSnapshot.val().text);
      });
      setComments(newComments);
    });
  }, []);

  // Add comment to Realtime Database and clear input
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      const commentsRef = app.database().ref("comments");
      commentsRef.push({
        text: comment,
        timestamp: new Date().getTime()
      });
      setComment("");
    }
  };

  // Update comment state on input change
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <div className={styles.maincontainer}>
        {comments.map((text) => (
          <div className={styles.commentcontainer}>{text}</div>
        ))}
        <form onSubmit={onSubmitHandler} className={styles.commentflexbox}>
          <h3 className={styles.commenttext}>Comment</h3>
          <textarea
            value={comment}
            onChange={onChangeHandler}
            className={styles.inputbox}
          ></textarea>
          <br></br>
          <button type="submit" className={styles.commentbutton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
