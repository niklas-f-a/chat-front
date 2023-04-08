import { ReactNode, createContext, useReducer, useState } from 'react';
import { ChatRoom, ChatSpace } from './types';

interface Action {
  type: ActionTypes
  payload?: any
}

enum ActionTypes {
  SET_CURRENT_SPACE = 'setCurrentSpace'
}

type State = {
  currentSpace: null | ChatSpace
  currentRoom: null | ChatRoom
}

type Dispatchers = {
  setCurrentSpace: (chatSpace: ChatSpace) => void
}


const stateHandler = {
  setCurrentSpace: (state: State, payload: any) => ({ ...state, currentSpace: payload })
}

const initState = {
  currentSpace: null,
  currentRoom: null
}

// type Context = {
//   state: State
//   dispatch: React.Dispatch<any>
// }
type Context = {
  currentSpaceId: string
  setCurrentSpaceId: (id: string) => void
  currentRoomId: string
  setCurrentRoomId: (id: string) => void
}

// export const StateContext = createContext<Context>({ state: initState, dispatch: () => null });
export const StateContext = createContext<Context | null>(null);

const reducer = (state: State, action: Action) =>
stateHandler[action.type](state, action.payload)

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  // const [state, dispatch] = useReducer(reducer, initState)
  const [currentSpaceId, setCurrentSpaceId] = useState('')
  const [currentRoomId, setCurrentRoomId] = useState('')

  return (
    // <StateContext.Provider value={{ state, dispatch }}>
    <StateContext.Provider value={{ currentRoomId, currentSpaceId, setCurrentRoomId, setCurrentSpaceId }}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContextProvider
