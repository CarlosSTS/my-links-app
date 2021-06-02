import axios from 'axios'

export const key  = '7fcf491b0572fbc5d78b886fc756d55f479cd39d';

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`
  }
})
export default api