export const API_ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000/api';
export const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_URL || 'http://127.0.0.1:8000';
export const getLoginEndpoint = () => `${API_ENDPOINT}/login`;
export const getMeEndpoint = () => `${API_ENDPOINT}/me`;
export const getBroadcastMessageEndpoint = () => `${API_ENDPOINT}/broadcastMessage`;

