import { useAuth, useChatRooms } from '../../hooks'
import { User } from '../../hooks/useAuth'
import { ServerBar } from './styled'

const ServersBar = () => {
  const { user } = useAuth()
  const { chatRooms } = useChatRooms(user) as { chatRooms: string }

  return (
    <ServerBar>Serversbar</ServerBar>
  )
}

export default ServersBar