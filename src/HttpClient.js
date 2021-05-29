import axios from 'axios';

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

export default {
    getApod() {
        return axios.get(`${nasaEndpoint}planetary/apod`);
    },
};