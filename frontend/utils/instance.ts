import axios, { type AxiosResponse } from 'axios'

const config = useRuntimeConfig()

const instance = axios.create({
  baseURL: config.public.api,
  headers: {
    'Content-Type': 'application/json',
  },
})

if (localStorage.getItem('access_token')) {
  instance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('access_token')}`
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_API + '/auth/refresh',
          {
            refresh_token: localStorage.getItem('refresh_token'),
          }
        )
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        return data
      } catch (err) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        delete instance.defaults.headers.common['Authorization']
      }
    }

    console.error(error)

    return Promise.reject(error)
  }
)

export default instance
