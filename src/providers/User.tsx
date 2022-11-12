import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  AuthError,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  SignUpInput,
  useMeLazyQuery,
  User,
  useSignUpMutation,
} from 'generated/generated-graphql'
import { useRouter } from 'next/router'
import { Routes } from 'constants/routes'
import FirebaseApp from 'utils/firebaseClient'

type UserContextType = {
  userData: User | null
  isLoading: boolean
  isFirebaseInitializing: boolean
  createUser: (input: SignUpInput) => Promise<void>
  logIn: (input: EmailAndPasswordInput) => Promise<void>
  logOut: () => Promise<void>
  refetchAndSetUserData: () => Promise<void>
}

type EmailAndPasswordInput = {
  email: string
  password: string
}

type UserProviderProps = {
  children: ReactNode
}

const FirebaseAuth = getAuth(FirebaseApp)

const UserContext = createContext({} as UserContextType)

export const useAuth = (): UserContextType => useContext(UserContext)

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const router = useRouter()
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirebaseInitializing, setIsFirebaseInitializing] = useState(true)

  const [getMe] = useMeLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [signUp] = useSignUpMutation()

  const logOut = useCallback(async () => {
    try {
      setIsLoading(true)
      await signOut(FirebaseAuth)
      void router.push(Routes.LandingPage())
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      alert(`UserProvider => logOut error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const refetchAndSetUserData = useCallback(async () => {
    try {
      const response = await getMe()
      if (response.data?.me) {
        setUserData(() => ({
          ...response.data!.me,
        }))
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      alert(`UserProvider => refetchAndSetUserData error: ${error}`)
      await logOut()
    }
  }, [getMe, logOut])

  const createUser = useCallback(
    async (input: SignUpInput) => {
      const { email, password } = input
      try {
        setIsLoading(true)
        const response = await signUp({
          variables: {
            input: {
              ...input,
              email,
              password,
            },
          },
        })

        if (!response.data?.signUp) {
          return
        }
        await signInWithEmailAndPassword(FirebaseAuth, email, password)
        void router.push(Routes.Dashboard())
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        alert(`UserProvider => createUser error: ${error}`)
      } finally {
        setIsLoading(false)
      }
    },
    [router, signUp]
  )

  const logIn = useCallback(
    async ({ email, password }: EmailAndPasswordInput) => {
      try {
        setIsLoading(true)
        await signInWithEmailAndPassword(FirebaseAuth, email, password)
        void router.push(Routes.Dashboard())
      } catch (err) {
        const error = err as AuthError
        alert(
          `UserProvider => signIn error: ${error.message} CODE: ${error.code}`
        )
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  useEffect(() => {
    const subscribeToFirebaseAuthState = FirebaseAuth.onAuthStateChanged(
      (firebaseUser) => {
        if (firebaseUser) {
          void (async () => {
            await refetchAndSetUserData()
            setIsFirebaseInitializing(false)
          })()
        } else {
          setUserData(null)
          setIsFirebaseInitializing(false)
        }
      }
    )
    return subscribeToFirebaseAuthState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const providerValue = useMemo(
    () =>
      ({
        userData,
        isLoading,
        isFirebaseInitializing,
        createUser,
        logIn,
        logOut,
        refetchAndSetUserData,
      } as UserContextType),
    [
      createUser,
      isFirebaseInitializing,
      isLoading,
      logIn,
      logOut,
      refetchAndSetUserData,
      userData,
    ]
  )

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
