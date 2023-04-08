import { useContext, useState } from 'react'
import { useChatRooms } from '../../hooks'
import CreateSpace from '../CreateRoom'
import { ServerBar } from './styled'
import { StateContext } from '../../context'

const ServersBar = () => {
  const state = useContext(StateContext)
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [newSpace, setNewSpace] = useState('')
  const { chatSpaces, chatSpaceMuation, joinSpaceMutation } = useChatRooms()

  const joinSpace = () => {
    joinSpaceMutation.mutate(newSpace)
  }

  const toggleIsCreatingRoom = () => {
    setIsCreatingRoom(creatingRoom => !creatingRoom)
  }

  const onCreateSpace = (spaceName: string) => {
    chatSpaceMuation.mutate(spaceName)
    toggleIsCreatingRoom()
  }

  if(!chatSpaces) return

  return (
    <ServerBar>
      {isCreatingRoom && ( <CreateSpace onCreateSpace={onCreateSpace} onCancel={toggleIsCreatingRoom} /> )}
      <button onClick={toggleIsCreatingRoom}>+</button>
      {chatSpaces?.map((chatSpace) => {
        return <div key={chatSpace.id} onClick={() => {
          state?.setCurrentSpaceId(chatSpace.id)
          }}>
          {chatSpace?.name}
        </div>
      })}
      <div>
        <input type="text" onChange={e => setNewSpace(e.target.value)} />
        <button onClick={joinSpace}>join</button>
      </div>
    </ServerBar>
  )
}

export default ServersBar