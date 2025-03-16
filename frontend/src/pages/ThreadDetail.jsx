import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ThreadDetail.css';

function ThreadDetail() {
  const { id } = useParams(); // Get the thread ID from the URL
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [responses, setResponses] = useState([]);
  const [message, setMessage] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [editingResponseId, setEditingResponseId] = useState(null);
  const [editingThread, setEditingThread] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/threads/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setThread(data.thread);
        setResponses(data.responses);
      })
      .catch((error) => console.error('Error fetching thread:', error));
  }, [id]);

  const handleReply = () => {
    if (message) {
      fetch('http://localhost:5000/api/threads/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thread_id: id, guest_name: 'Guest', message }),
      })
        .then((response) => response.json())
        .then(() => {
          setResponses((prev) => [...prev, { guest_name: 'Guest', message }]);
          setMessage('');
        });
    }
  };

  const handleEdit = (responseId, currentMessage) => {
    setEditingResponseId(responseId);
    setEditedMessage(currentMessage);
  };

  const handleSaveEdit = (responseId) => {
    if (editedMessage) {
      fetch(`http://localhost:5000/api/threads/responses/${responseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: editedMessage }),
      })
        .then((response) => response.json())
        .then(() => {
          setResponses(
            responses.map((response) =>
              response.id === responseId
                ? { ...response, message: editedMessage }
                : response
            )
          );
          setEditingResponseId(null);
          setEditedMessage('');
        });
    }
  };

  const handleDelete = (responseId) => {
    // console.log("Attempting to delete response with ID:", responseId);
    if (!responseId) {
      // console.error("Error: responseId is undefined!");
      return;
    }

    fetch(`http://localhost:5000/api/threads/responses/${responseId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setResponses(
          responses.filter((response) => response.id !== responseId)
        );
      });
  };

  const handleEditThread = () => {
    setEditingThread(true);
    setNewTitle(thread.title);
    setNewContent(thread.content);
  };

  const handleSaveThreadEdit = () => {
    fetch(`http://localhost:5000/api/threads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    })
      .then((response) => response.json())
      .then(() => {
        setThread({ ...thread, title: newTitle, content: newContent });
        setEditingThread(false);
      });
  };

  const handleDeleteThread = () => {
    fetch(`http://localhost:5000/api/threads/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/');
      });
  };

  if (!thread) return <div>Loading...</div>;

  return (
    <div className="thread-container">
      <div className="thread-box">
        <h1>
          {editingThread ? (
            <div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="input-field"
              />
            </div>
          ) : (
            thread.title
          )}
        </h1>

        {editingThread ? (
          <div>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="textarea-field"
            />
          </div>
        ) : (
          <p>{thread.content}</p>
        )}

        <div className="thread-actions">
          {editingThread ? (
            <button onClick={handleSaveThreadEdit} className="save-btn">
              Save
            </button>
          ) : (
            <button onClick={handleEditThread} className="edit-btn">
              Edit Thread
            </button>
          )}
          <button onClick={handleDeleteThread} className="delete-btn">
            Delete Thread
          </button>
        </div>

        <h3>Responses:</h3>
        <ul className="response-list">
          {responses.map((response) => {
            // console.log("Rendering response:", response); // Debugging line
            return (
              <li key={response.id} className="response-item">
                {editingResponseId === response.id ? (
                  <div>
                    <textarea
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className="textarea-field"
                    />
                    <button
                      onClick={() => handleSaveEdit(response.id)}
                      className="save-btn"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="response-content">
                    <strong>{response.guest_name}: </strong>
                    {response.message}
                    <button
                      onClick={() => handleEdit(response.id, response.message)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(response.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a response..."
          className="textarea-field"
        />
        <button onClick={handleReply} className="reply-btn">
          Reply
        </button>
      </div>
    </div>
  );
}

export default ThreadDetail;
