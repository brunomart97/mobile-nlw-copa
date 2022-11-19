import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoadins] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '1063250962415-sibl0t951vrcjmsit8f7a712lj59t1g9.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserLoadins(true)
      await promptAsync()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoadins(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log('TOKEN DE AUTH: ', access_token)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
