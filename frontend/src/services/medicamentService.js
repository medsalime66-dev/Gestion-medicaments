import axios from 'axios';

const API_URL = 'http://localhost:8080/api/medicaments';

export const getAll = () => axios.get(API_URL);
export const getById = (id) => axios.get(`${API_URL}/${id}`);
export const create = (data) => axios.post(API_URL, data);
export const update = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const remove = (id) => axios.delete(`${API_URL}/${id}`);
export const search = (nom) => axios.get(`${API_URL}/search?nom=${nom}`);
export const getStockFaible = () => axios.get(`${API_URL}/stock-faible`);