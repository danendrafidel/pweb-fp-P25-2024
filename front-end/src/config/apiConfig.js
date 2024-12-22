import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
    }
})

apiClient.interceptors.request.use(
    (con) => {
        const token = localStorage.getItem('authToken');
        if(token){
            con.headers.Authorization = `Bearer ${token}`;
        }
        return con;
    },
    (err) => Promise.reject(err)
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized. Redirecting to login.');
      }
      return Promise.reject(error);
    }
  );
  
  export default apiClient;