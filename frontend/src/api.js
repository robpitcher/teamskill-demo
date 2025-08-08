import axios from 'axios';
const baseURL = import.meta.env?.VITE_API_BASE || '/api';
const api = axios.create({
    baseURL,
    withCredentials: true
});
export async function apiGet(url) {
    const res = await api.get(url);
    return res.data;
}
export async function apiPost(url, body) {
    const res = await api.post(url, body, {
        headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
}
export default api;
