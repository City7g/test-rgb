import type { AuthStatus } from '~/types/Auth'
import type { User, UserResponse } from '~/types/User'
import instance from '~/utils/instance'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  const status: Ref<AuthStatus> = ref('null')

  const saveToken = (token: string, refreshToken: string) => {
    localStorage.setItem('access_token', token)
    localStorage.setItem('refresh_token', refreshToken)
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const saveUser = (userData: User) => {
    user.value = userData
    status.value = 'auth'
  }

  const errorData = (err) => {
    status.value = 'error'
    throw err
  }

  const login = async (email: string, password: string) => {
    status.value = 'loading'

    try {
      const { data } = await instance.post('/auth/login', {
        email,
        password,
      })

      saveToken(data.access_token, data.refresh_token)
      saveUser(data.user)
      return true
    } catch (err) {
      errorData(err)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    status.value = 'loading'

    try {
      const { data } = await instance.post('/auth/register', {
        name,
        email,
        password,
      })

      saveToken(data.access_token, data.refresh_token)
      saveUser(data.user)
      return true
    } catch (err) {
      errorData(err)
    }
  }

  const me = async () => {
    status.value = 'loading'

    try {
      const { data } = await instance.post('/auth/me')

      saveUser(data.user)
    } catch (err) {
      errorData(err)
    }
  }

  const refresh = async () => {
    status.value = 'loading'

    try {
      const { data } = await instance.post('/auth/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
        expiresInMins: 1,
      })

      saveToken(data.data.token, data.data.refreshToken)
      saveUser(data.data.user)
    } catch (err) {
      errorData(err)
    }
  }

  const update = async (userData) => {
    try {
      const { data } = await instance.post('/auth/update', userData)
      console.log(data)

      user.value = { ...user.value, ...data }
    } catch (err) {
      errorData(err)
    }
  }

  const logout = async () => {
    try {
      await instance.post('/auth/logout')
      user.value = null
      status.value = 'null'
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    } catch (err) {
      errorData(err)
    }
  }

  const isAuth = (): boolean => status.value === 'auth'

  return {
    user,
    status,
    login,
    register,
    me,
    isAuth,
    refresh,
    logout,
    update,
  }
})
