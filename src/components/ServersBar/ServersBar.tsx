import { useChatRooms } from '../../hooks'
import { ServerBar } from './styled'

const ServersBar = () => {
  const { chatRooms } = useChatRooms()

  return (
    <ServerBar>Serversbar</ServerBar>
  )
}

export default ServersBar