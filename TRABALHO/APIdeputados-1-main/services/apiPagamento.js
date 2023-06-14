import axios from 'axios';

const apiPagamento = axios.create({
  baseURL: 'https://api.github.com',
});

export default apiPagamento;