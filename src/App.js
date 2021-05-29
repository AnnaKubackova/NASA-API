import React, { useState, useEffect } from 'react';
import HttpClient from './HttpClient';
import './css/style.css';

const App = () => {
  const [apod, setApod] = useState({});

  useEffect(() => {
    HttpClient.getApod().then(apodData => {
      setApod(apodData.data);
    });
  }, []);

  return (
    <main>
      <h1 className="my-2">NASA API</h1>
      <h2>Astronomy Picture of the Day</h2>
      {apod && (
        <article>
          <img src={apod.url} alt="APOD" className="my-1" />
          <header className="my-1"> 
            {apod.title} - <i>{apod.date}</i>
          </header>
          <p className="text-explanation">{apod.explanation}</p>
          <p className="text-json my-2 p-1">
            {JSON.stringify(apod, null, 2)}
          </p>
        </article>
      )}
    </main>
  );
};

export default App;