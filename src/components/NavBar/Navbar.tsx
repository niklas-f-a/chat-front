import { useAuth } from '../../hooks'
import { Nav } from './styled'

const NavBar = () => {
  const { mutateLogout } = useAuth()

  const onLogout = () => {
    mutateLogout.mutate()
  }

  return (<Nav><button onClick={onLogout}>Logout</button></Nav>)
}

export default NavBar