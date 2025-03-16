import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ThreadList.css';

function ThreadList() {
  const [threads, setThreads] = useState([]);
  const [sortOption, setSortOption] = useState('latest'); // Default to 'latest'
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState(''); // For keyword search

  useEffect(() => {
    // Construct query URL with selected filters and sort option
    let query = `http://localhost:5000/api/threads?sort=${sortOption}`;

    // if (category) query += `&category=${category}`;
    if (category) query += `&category=${category}`;
    if (keyword) query += `&keyword=${keyword}`;

    fetch(query)
      .then((response) => response.json())
      .then((data) => setThreads(data)); // Set threads based on the filtered data
  }, [sortOption, category, keyword]); // Re-fetch when sort, category, or keyword changes

  const handleSortChange = (event) => {
    setSortOption(event.target.value); // Update the sort option
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value); // Update the keyword search
  };

  return (
    <div className="thread-container">
      <h1 className="title">Discussion Threads</h1>
      {/* Search by keyword */}
      <div className="filters">
        <label>Search by keyword: </label>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search by keyword"
          className="search-box"
        />
      </div>

      <div className="sort-category-container">
        {/* Sorting Options */}
        <div className="sort-container">
          <label>Sort by: </label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="dropdown"
          >
            <option value="latest">Latest Activity</option>
            <option value="responses">Number of Responses</option>
          </select>
        </div>

        {/* Filter by Category */}
        <div className="filter-category-container">
          <label>Filter by Category: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="dropdown"
          >
            <option value="">All</option>
            <option value="General">General</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
      </div>

      {/* Display threads */}
      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={thread.id} className="thread-item">
            <Link to={`/thread/${thread.id}`} className="thread-title">
              {thread.title}
            </Link>
            <p className="thread-content">{thread.content}</p>
            <p className="thread-meta">Category: {thread.category}</p>
            <p className="thread-meta">
              {sortOption === 'latest'
                ? `Last Activity: ${thread.last_activity || 'No responses yet'}` // Show last activity or default message
                : `Responses: ${thread.response_count}`}
            </p>
          </li>
        ))}
      </ul>

      <Link to="/create" className="create-thread">
        Create a new thread
      </Link>
    </div>
  );
}

export default ThreadList;
