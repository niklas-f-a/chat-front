import { useState } from 'react'
import { useChatRooms } from '../../hooks'
import CreateSpace from '../CreateRoom'
import { ServerBar } from './styled'

const ServersBar = () => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const { chatSpaces, setCurrentSpace } = useChatRooms()


  const toggleIsCreatingRoom = () => {
    setIsCreatingRoom(creatingRoom => !creatingRoom)
  }

  return (
    <ServerBar>
      {isCreatingRoom && ( <CreateSpace onCancel={toggleIsCreatingRoom} /> )}
      <button onClick={toggleIsCreatingRoom}>+</button>
      {chatSpaces && chatSpaces.map(chatSpace => {
        return <div key={chatSpace.id} onClick={() => {
          setCurrentSpace(chatSpace)
          }}>
          {chatSpace.name}
        </div>
      })}
    </ServerBar>
  )
}

export default ServersBar