import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useAuth, useDebounce } from '../../hooks'
import { Nav } from './styled'
import { createPortal } from 'react-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../api'
import { FriendRequest } from '../../hooks/useAuth'

type ModalProps = {
  // searchTerm: string
  // setSearchTerm: Dispatch<SetStateAction<string>>
}

const Modal = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debaounceValue = useDebounce(searchTerm, 500)
  const { data: users, refetch } = useQuery(['query', 'users'], {
    queryFn: findUsers,
    enabled: !!debaounceValue
  });

  useEffect(() => {
    if(debaounceValue === '') return
    refetch()

  }, [debaounceValue])

  async function findUsers() {
    const { data } = await api.users.find(debaounceValue)

    return data
  }

  const sendFriendRequest = () => {

  }

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)` , backgroundColor: 'purple', minHeight: 300, width: 500 }}>
      <input type="text" onChange={e => setSearchTerm(e.target.value)} />
      <button>hej</button>
      {!!debaounceValue && users && users.map(user => {
        return <p key={user._id} onClick={sendFriendRequest} >{user.email ?? user.username}</p>
      })}
    </div>
  )
}

const FriendsModal = ({ closeModal, incomingFriends, acceptRequest }: { closeModal: () => void, incomingFriends: FriendRequest[], acceptRequest: () => void }) => {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)` , backgroundColor: 'purple', minHeight: 300, width: 500 }}>
      <button onClick={closeModal} >Stäng</button>
      {incomingFriends.map(req => {
        return (
          <span style={{ display: 'flex' }}>
            <p>{req.requester.username}</p>
            <button onClick={acceptRequest}>Accept</button>
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

  const getIncomingFriendRequests = () =>
    user?.friendRequests.filter(request =>
      user._id === request.receiver._id
    ) ?? []

  const toggleFriendsModal = () => setIsModalOpen(!isModalOpen)

  const onLogout = () => {
    mutateLogout.mutate()
  }

  const onAcceptRequest = () => {

  }

  const toggleFriendFinder = () => setIsFinding(!isFinding)

  const incomingFriends = getIncomingFriendRequests()

  return (
    <Nav>
      <button onClick={onLogout}>Logout</button>
      <button onClick={toggleFriendFinder}>Add friend</button>
      {isFinding && createPortal(<Modal />, document.body)}
      {<p onClick={toggleFriendsModal} style={{ color: 'white' }}>{incomingFriends.length} Friend requests</p>}
      {isModalOpen && createPortal(<FriendsModal acceptRequest={onAcceptRequest} incomingFriends={incomingFriends} closeModal={toggleFriendsModal} />, document.body)}
    </Nav>)
}

export default NavBar