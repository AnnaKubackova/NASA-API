import React, { useState, useEffect } from 'react';
import HttpClient from './HttpClient';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log('hello');

const App = () => {
  const [apod, setApod] = useState({});

  useEffect(() => {
    getApod().then(apodData => {
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


const nasaEndpoint = 'https://api.nasa.gov/';
const nasaApiKey = 'A4MB4lB9jWXWoT8iyear4SN77b9NOiDzQkddW41g';

axios.interceptors.request.use(
    config => {
        config.params = config.params ? config.params : {};
        const configUrl = config.url;
        if (configUrl.includes(nasaEndpoint)) {
            config.params['api_key'] = nasaApiKey;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getApod = () => {
        return axios.get(`${nasaEndpoint}planetary/apod`);
};


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);