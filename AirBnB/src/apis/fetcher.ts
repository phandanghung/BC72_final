import axios from 'axios';
import { Content} from '../interfaces/user.interface';


const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
  },
});

// fetcher.interceptors.request.use((config: any) => {
//   const user = JSON.parse(localStorage.getItem('currentUser') || '{}') as Content;
//   if (user) {
//     config.headers['Authorization'] = `Bearer ${user.token}`;
//   }
//   return config;
// });

export default fetcher;
