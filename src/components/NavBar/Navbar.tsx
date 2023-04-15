import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { useAuth, useDebounce } from '../../hooks'
import { Nav } from './styled'
import { createPortal } from 'react-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../api'
import { FriendRequest } from '../../hooks/useAuth'
import { StateContext } from '../../context'

type ModalProps = {
  // searchTerm: string
  // setSearchTerm: Dispatch<SetStateAction<string>>
}

const Modal = () => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const debaounceValue = useDebounce(searchTerm, 500)
  const { data: users, refetch } = useQuery(['query', 'users'], {
    queryFn: findUsers,
    enabled: !!debaounceValue
  });

  const mutationAddFriend = useMutation(sendFriendRequest, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth'] })
  })

  useEffect(() => {
    if(debaounceValue === '') return
    refetch()

  }, [debaounceValue])

  async function findUsers() {
    const { data } = await api.users.find(debaounceValue)

    return data
  }

  function sendFriendRequest(receiver: string){
    return api.users.sendFriendRequest(receiver)
  }

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)` , backgroundColor: 'purple', minHeight: 300, width: 500 }}>
      <input type="text" onChange={e => setSearchTerm(e.target.value)} />
      <button>hej</button>
      {!!debaounceValue && users && users.map(user => {
        return (
          <span style={{ display: 'flex' }}>
            <p key={user._id} >{user.email ?? user.username}</p>
            <button onClick={() => mutationAddFriend.mutate(user._id)}>Send request</button>
          </span>
        )
      })}
    </div>
  )
}

const FriendsModal = ({
  closeModal,
  incomingFriends,
  acceptRequest,
  pendingInvites
}: {
  closeModal: () => void,
  incomingFriends: FriendRequest[],
  acceptRequest: (id: string) => void,
  pendingInvites: FriendRequest[]
}) => {

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)` , backgroundColor: 'purple', minHeight: 300, width: 500 }}>
      <button onClick={closeModal} >Stäng</button>
      <h3>Friend requests</h3>
      {incomingFriends.map(req => {
        return (
          <span key={req.receiver._id} style={{ display: 'flex' }}>
            <p>{req.requester.username}</p>
            <button onClick={() => acceptRequest(req._id)}>Accept</button>
          </span>
        )
      })}
      <h3>Pending</h3>
      {pendingInvites.map(req => {
        return (
          <span key={req.requester._id} style={{ display: 'flex' }}>
            <p>{req.requester.username}</p>
          </span>
        )
      })}
    </div>
  )
}

const NavBar = () => {
  const [isFinding, setIsFinding] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutateLogout, user } = useAuth()
  const queryClient = useQueryClient()
  const muationAcceptRequest = useMutation(acceptRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  })

  const getFriendsInvitations = () =>
    user?.friendRequests.filter(request =>
      user._id === request.receiver._id && !request.established
    ) ?? []

  const getFriendRequests = () =>
    user?.friendRequests.filter(request =>
      user._id === request.requester._id && !request.established
    ) ?? []

  const toggleFriendsModal = () => setIsModalOpen(!isModalOpen)

  const onLogout = () => {
    mutateLogout.mutate()
  }

  async function acceptRequest (requestId: string)  {
    const { data } = await api.users.acceptRequest(requestId)

    return data
  }

  const onAcceptRequest = (requestId: string) => {
    muationAcceptRequest.mutate(requestId)
  }

  const toggleFriendFinder = () => setIsFinding(!isFinding)

  const incomingFriends = getFriendsInvitations()
  const outgoingFriends = getFriendRequests()

  return (
    <Nav>
      <button onClick={onLogout}>Logout</button>
      <button onClick={toggleFriendFinder}>Add friend</button>
      {isFinding && createPortal(<Modal />, document.body)}
      {<p onClick={toggleFriendsModal} style={{ color: 'white' }}>{incomingFriends.length} Friend requests</p>}
      {<p onClick={toggleFriendsModal} style={{ color: 'white' }}>{outgoingFriends.length} Pending invites</p>}
      {isModalOpen && createPortal(<FriendsModal acceptRequest={onAcceptRequest} incomingFriends={incomingFriends} pendingInvites={outgoingFriends} closeModal={toggleFriendsModal} />, document.body)}
    </Nav>)
}

export default NavBar