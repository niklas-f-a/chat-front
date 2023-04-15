import { useContext, useState } from 'react'
import { useAuth, useChatRooms } from '../../hooks'
import { ChatRooms } from './styled'
import { StateContext } from '../../context'
import { FriendRequest } from '../../hooks/useAuth'

const SideBar = () => {
  const state = useContext(StateContext)
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false)
  const { findCurrentSpace, personalSpace, joinSpaceMutation } = useChatRooms()
  const { user } = useAuth()
  const currentSpace = findCurrentSpace()

  const isYourSpace = state?.currentSpaceId === user?.personalSpace
  const establishedFriends = user?.friendRequests.filter(req => req.established)

  const getFriendFromRequest = (request: FriendRequest) =>
    request.requester._id === user?._id ? request.receiver : request.requester

  const addFriendToSpace = (friendId: string) => {
    if(!state?.currentSpaceId) return
    joinSpaceMutation.mutate({ id: state.currentSpaceId, userId: friendId })

  }

  const toggleAddFrienModal = () => setIsFriendModalOpen(!isFriendModalOpen)

  const friends = establishedFriends?.map(getFriendFromRequest)

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
    <>
    <ChatRooms>
      <button onClick={toggleAddFrienModal}>Add friend</button>
      {currentSpace?.chatRooms.map(room => {
       return  <p key={room.id} onClick={() => state?.setCurrentRoomId(room.id)}>{room.name}</p>
      })}
    </ChatRooms>
    {isFriendModalOpen && (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)` , backgroundColor: 'purple', minHeight: 300, width: 500 }}>
      <button>stäng</button>
      {friends?.map(friend => (
        <div style={{ display: 'flex' }} key={friend._id}>
          <p>{friend.username}</p>
          <button onClick={() => addFriendToSpace(friend._id)}>Add friend to space</button>
        </div>
      ))}
    </div>
  )}
    </>
  )
}

export default SideBar