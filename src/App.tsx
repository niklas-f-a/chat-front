import Layout from "./views/Layout"
import LoggedOut from "./views/LoggedOut"
import { useAuth } from './hooks'

export type UserCred = {
  username: string,
  password: string,
}

const App = () => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn
    ?  <Layout />
    : <LoggedOut />


}

export default App