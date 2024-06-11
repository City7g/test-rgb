export const useAuth = async () => {
  const authUser = useAuthUser()

  const setUser = (user: User) => {
    authUser.value = user
  }

  const login = async (email: string, password: string) => {
    try {
      const data = await instance.post('/auth/login', {
        email,
        password,
      })

      setUser(data)
    } catch (err) {
      return null
    }
  }

  const userLoggedIn = async () => {
    if (!authUser.value) {
      const data = await $fetch('/api/user/token', {
        headers: useRequestHeaders(['cookie']),
      })
      setUser(data.user)
      return data
    }
  }

  const logout = async () => {
    const data = await $fetch('/api/user/logout')
    setUser(data.user)
    return data
  }

  const me = async () => {
    const data = await instance.post('/auth/me')
    setUser(data)
    return data
  }

  return {
    login,
    userLoggedIn,
    logout,
    authUser,
  }
}
