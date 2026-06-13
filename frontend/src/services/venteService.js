import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ventes';

export const getVentes = () => axios.get(API_URL);
export const enregistrerVente = (data) => axios.post(API_URL, data);
