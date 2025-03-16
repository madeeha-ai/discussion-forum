import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateThread.css'; // Import custom CSS

function CreateThread() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (title && content && category) {
      fetch('http://localhost:5000/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, category }),
      })
        .then((response) => response.json())
        .then(() => {
          navigate('/');
        });
    }
  };

  return (
    <div className="create-thread-container">
      <h1 className="title">Create a New Thread</h1>

      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter thread title..."
          className="input-field"
        />
      </div>

      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write thread content..."
          className="textarea-field"
        />
      </div>

      <div className="form-group">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-field"
        >
          <option value="General">General</option>
          <option value="Technology">Technology</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      <button onClick={handleCreate} className="create-button">
        Create Thread
      </button>
    </div>
  );
}

export default CreateThread;
