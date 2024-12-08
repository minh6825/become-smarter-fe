import { NEXT_PUBLIC_SERVER } from '@/assets/constant'
import { getCookieFc } from '@/assets/function'
import axios from 'axios'
const axiosConfig = axios.create({
  baseURL: NEXT_PUBLIC_SERVER,
  timeout: 10000,
  headers: { 
    'X-Custom-Header': 'foobar',
    'Access-Control-Allow-Origin': 'true',
    'Content-Type': 'application/json',
   },
  withCredentials: true  
})

// Add a request interceptor
 axiosConfig.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const accessToken = getCookieFc('accessToken')
    console.log(accessToken)
    if(accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
      const refreshToken = accessToken;   
      config.headers['x-refresh-token'] = refreshToken;
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data.message == 'TokenExpiredError') {
      const userData = JSON.parse(localStorage.getItem('userInfoQuizziz') || '')
      const updateAccessToken = {...userData, accessToken: response.data.newAccessToken}
      localStorage.setItem('userInfoQuizziz', JSON.stringify(updateAccessToken))
      window.location.reload(); // Deprecated 
    }
    return response
  },
  function (error) {
    // if (error.response && error.response.status === 401) {
    //   // Token expired or unauthorized, redirect to home page
    //   localStorage.removeItem('userInfoQuizziz')
    //   window.location.assign('/login')
    //   window.alert('Expired token')
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosConfig
