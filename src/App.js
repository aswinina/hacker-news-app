import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchTopStories();
  }, []);

  async function fetchTopStories() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    
    const storyPromises = storyIds.slice(0, 10).map(async (id) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      return storyResponse.json();
    });

    const storiesData = await Promise.all(storyPromises);
    const sortedStories = storiesData.sort((a, b) => a.score - b.score);

    setStories(sortedStories);
  }

  return (
    <div className="App">
      <h1>Hacker News Stories</h1>
      <ul className="stories-list">
        {stories.map((story) => (
          <li key={story.id} className="story">
            <h2>{story.title}</h2>
            <p>URL: <a href={story.url} target="_blank" rel="noopener noreferrer">{story.url}</a></p>
            <p>Timestamp: {new Date(story.time * 1000).toLocaleString()}</p>
            <p>Score: {story.score}</p>
            <p>Author ID: {story.by}</p>
            <p>Author Karma Score: {story.karma}</p>
            <img src={require('./dummy-image.jpeg')} alt="Dummy Image" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
