import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from "firebase/database";
import { app } from '../../firebase';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Listen for changes to the comments data in the Firebase Realtime Database
    const db = getDatabase(app);
    const commentsRef = ref(db, 'comments');
    onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      setComments(commentsData);
    });
  }, []);

  const handleCommentChange = event => {
    setNewComment(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Push the new comment to the Firebase Realtime Database
    const db = getDatabase(app);
    const commentsRef = ref(db, 'comments');
    push(commentsRef, {
      text: newComment,
      timestamp: Date.now(),
    });
    setNewComment('');
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {Object.keys(comments).map(key => (
          <li key={key}>{comments[key].text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Add a comment:
          <input type="text" value={newComment} onChange={handleCommentChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentSection;
