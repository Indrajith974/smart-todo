import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

// Generic helper wrappers
export const getTasks = () => api.get('/tasks/');
export const getCategories = () => api.get('/categories/');
export const getContextEntries = () => api.get('/context/');

export const createTask = (data: any) => api.post('/tasks/', data);
export const createContextEntry = (data: any) => api.post('/context/', data);
