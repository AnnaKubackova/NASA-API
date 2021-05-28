import React, { useState, useEffect } from 'react';
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

export default function Fetch({ url }) {
    const [data, setData] = useState(null);

    useEffect(
        () => {
            let mounted = true;

            const loadData = async () => {
                const response = await axios.get(url);
                if (mounted) {
                    setData(response.data);
                }
            };
            loadData();

            return () => {
                mounted = false
            };
        },
        [url]
    );

    if (!data) {
        return <span data-testid="loading">Loading data...</span>;
    }

    return (
        <article>
          <img src={data.url} alt="APOD" className="my-1" />
          <header className="my-1" data-testid="resolvedtitle">
            {data.title} - <i>{data.date}</i>
          </header>
          <p className="text-explanation">{data.explanation}</p>
          <p className="text-json my-2 p-1">
            {JSON.stringify(data, null, 2)}
          </p>
        </article>
    );
}