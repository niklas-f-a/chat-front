import { useContext } from 'react'
import { useAuth, useChatRooms } from '../../hooks'
import { ChatRooms } from './styled'
import { StateContext } from '../../context'
import { FriendRequest } from '../../hooks/useAuth'

const SideBar = () => {
  const state = useContext(StateContext)
  const { findCurrentSpace, personalSpace } = useChatRooms()
  const { user } = useAuth()
  const currentSpace = findCurrentSpace()

  const isYourSpace = state?.currentSpaceId === user?.personalSpace

  console.log(personalSpace)
  const friends = user?.friendRequests.filter(req => req.established)

  const getFriendFromRequest = (request: FriendRequest) =>
    request.requester._id === user?._id ? request.receiver : request.requester

  return isYourSpace
  ? (
    <ChatRooms>
    {personalSpace?.chatRooms?.map(room => {
      return (
        <p
          key={room.id}
          onClick={() => state?.setCurrentRoomId(room.id)}
        >
          {room.name}
        </p>
      )
    })}
  </ChatRooms>)
  : (
    <ChatRooms>
      {currentSpace?.chatRooms.map(room => {
       return  <p key={room.id} onClick={() => state?.setCurrentRoomId(room.id)}>{room.name}</p>
      })}
    </ChatRooms>
  )
}

export default SideBar