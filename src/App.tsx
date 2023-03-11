import Layout from "./views/Layout"
import LoggedOut from "./views/LoggedOut"

const App = () => {
  const loggedOut = true
  return loggedOut
      ? <LoggedOut />
      :  <Layout />


}

export default App