import { useChatRooms } from '../../hooks'
import { ChatRooms } from './styled'

const SideBar = () => {
  const { currentSpace, setCurrentRoom } = useChatRooms()

  return (
    <ChatRooms>
      {currentSpace?.chatRooms.map(room => {
       return  <p onClick={() => setCurrentRoom(room)}>{room.name}</p>
      })}
    </ChatRooms>
  )
}

export default SideBar