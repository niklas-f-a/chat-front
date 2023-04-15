import { useContext, useState } from 'react'
import { useChatRooms } from '../../hooks'
import CreateSpace from '../CreateRoom'
import { ServerBar } from './styled'
import { StateContext } from '../../context'

const ServersBar = () => {
  const state = useContext(StateContext)
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [newSpace, setNewSpace] = useState('')
  const { chatSpaces, chatSpaceMuation, personalSpace } = useChatRooms()

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
      <div onClick={() => {
          state?.setCurrentSpaceId(personalSpace?.id as string)
          }}>
          {personalSpace?.name}
      </div>
      {chatSpaces?.map((chatSpace) => {
        return <div key={chatSpace.id} onClick={() => {
          state?.setCurrentSpaceId(chatSpace.id)
          }}>
          {chatSpace?.name}
        </div>
      })}
    </ServerBar>
  )
}

export default ServersBar