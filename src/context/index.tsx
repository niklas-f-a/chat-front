import { ReactNode, createContext, useReducer, useState } from 'react';
import { ChatRoom, ChatSpace } from './types';

type Context = {
  currentSpaceId: string
  switchSpace: (id: string) => void
  currentRoomId: string
  setCurrentRoomId: (id: string) => void
}

export const StateContext = createContext<Context | null>(null);

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentSpaceId, setCurrentSpaceId] = useState('')
  const [currentRoomId, setCurrentRoomId] = useState('')

  const switchSpace = (spaceId: string) => {
    setCurrentRoomId('')
    setCurrentSpaceId(spaceId)
  }

  return (
    <StateContext.Provider value={{ currentRoomId, currentSpaceId, setCurrentRoomId, switchSpace }}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContextProvider
