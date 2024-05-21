import React, { createContext, useState, useEffect, useContext } from 'react'

import { useRouter } from 'next/navigation'
import { setCookie, parseCookies } from 'nookies'

import * as apiClient from '@/services/api/client'
import { ISignUpPayload } from '@/services/api/client/Session/interface'

type ILoginPayload = {
  password: string
  email: string
}

interface IUser {
  id: string
  name: string
  email: string
  access_token: string
}

interface IAuthenticateContext {
  handleSignIn({ password, email }: ILoginPayload): Promise<IUser | void>
  handleSignUp({ name, email, password, avatar, job }: ISignUpPayload): Promise<void>
  handleSignOut(): void
  user: IUser | null
  signed: boolean
}

interface IAuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthenticateContext>({} as IAuthenticateContext)

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const router = useRouter()
  const [signed, setSigned] = useState<boolean>(false)
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const { 'postify.token': postify_token } = parseCookies()

  if (postify_token && postify_token !== token) setToken(postify_token)

  async function handleSignIn({ email, password }: ILoginPayload) {
    try {
      const response = await apiClient.Authenticate({ email, password })

      const { access_token } = response

      setCookie(undefined, 'postify.token', access_token, { maxAge: 30 * 24 * 60 * 60, path: '/' })

      setUser(user)
      setSigned(true)
      router.push('/home')
    } catch (error) {
      console.log(error)
      return alert('Erro ao fazer login')
    }
  }

  async function handleSignUp({ name, email, password, avatar, job }: ISignUpPayload) {
    try {
      const response = await apiClient.SignUp({ name, email, password, avatar, job })

      const { access_token, user } = response

      setCookie(undefined, 'postify.token', access_token, { maxAge: 30 * 24 * 60 * 60, path: '/' })

      setUser(user)
      setSigned(true)
      router.push('/home')
    } catch (error) {
      console.log(error)
      return alert('Erro ao fazer login')
    }
  }

  function handleSignOut() {
    localStorage.clear()

    setSigned(false)
    setUser(null)

    router.push('/')
  }

  function loadStorageData() {
    setUser(user)
  }

  useEffect(() => loadStorageData(), [token])

  return (
    <AuthContext.Provider value={{ handleSignOut, handleSignIn, signed, user, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, AuthContext, useAuth }
