import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useAuth, useDebounce } from '../../hooks'
import { Nav } from './styled'
import { createPortal } from 'react-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../api'

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

  async function findUsers() {
    const { data } = await api.users.find(debaounceValue)

    return data
  }

  useEffect(() => {
    if(debaounceValue === '') return
    refetch()

  }, [debaounceValue])

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)` , backgroundColor: 'purple', minHeight: 300, width: 500 }}>
      <input type="text" onChange={e => setSearchTerm(e.target.value)} />
      <button>hej</button>
      {!!debaounceValue && users && users.map(user => {
        return <p key={user._id}>{user.email ?? user.username}</p>
      })}
    </div>
  )
}

const NavBar = () => {
  const [isFinding, setIsFinding] = useState(false)
  const { mutateLogout } = useAuth()

  const onLogout = () => {
    mutateLogout.mutate()
  }

  const toggleFriendFinder = () => setIsFinding(!isFinding)

  return (
    <Nav>
      <button onClick={onLogout}>Logout</button>
      <button onClick={toggleFriendFinder}>Add friend</button>
      {isFinding && createPortal(<Modal />, document.body)}
    </Nav>)
}

export default NavBar