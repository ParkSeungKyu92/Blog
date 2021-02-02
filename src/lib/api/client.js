import axios from 'axios';

const client = axios.create();

// client.defaults.basURL = 'https://external-api-server.com/';

// client.defaults.headers.common['Authorization'] = 'effortsk';

// axios.intercepter.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

export default client;