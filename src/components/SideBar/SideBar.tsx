import { useContext } from 'react'
import { useChatRooms } from '../../hooks'
import { ChatRooms } from './styled'
import { StateContext } from '../../context'

const SideBar = () => {
  const state = useContext(StateContext)
  const { findCurrentSpace } = useChatRooms()
  const currentSpace = findCurrentSpace()

  return (
    <ChatRooms>
      {currentSpace?.chatRooms.map(room => {
       return  <p key={room.id} onClick={() => state?.setCurrentRoomId(room.id)}>{room.name}</p>
      })}
    </ChatRooms>
  )
}

export default SideBar