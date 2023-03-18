import { useQuery } from "@tanstack/react-query"
import Layout from "./views/Layout"
import LoggedOut from "./views/LoggedOut"

export type UserCred = {
  username: string,
  password: string,
}



const App = () => {

  const loggedOut = true
  return loggedOut
      ? <LoggedOut />
      :  <Layout />


}

export default App