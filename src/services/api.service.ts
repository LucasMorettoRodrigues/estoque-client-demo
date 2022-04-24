import axios from 'axios'

axios.defaults.baseURL = 'https://app-estoque-826.herokuapp.com/api/v1';

export const api = axios.create()