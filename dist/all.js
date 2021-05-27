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
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import axios from 'axios';

const nasaEndpoint = process.env.REACT_APP_NASA_ENDPOINT;
const nasaApiKey = process.env.REACT_APP_NASA_API_KEY;

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

export default {
    getApod() {
        return axios.get(`${nasaEndpoint}planetary/apod`);
    },
};
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
