import { SyntheticEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import { io } from "socket.io-client"


const options = {
  withCredentials: true,
  autoConnect: false
}

const socket = io('http://127.0.0.1:5050', options);

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [some, setSome] = useState<any>(null)
  const [someText, setSomeText] = useState<any>('')

  const [isLoginForm, setIsLoginForm] = useState(true)

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string | null>(null);

  const getSome =( ) => {
    axios.get('http://127.0.0.1:5001/api/v1/chat', { withCredentials: true }).then(res => {
      console.log(res)
    })

  }

  useEffect(() => {
    if(!some) return
    // socket enter
    socket.connect()

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, [some])

  const onLogin = (e: SyntheticEvent) => {
    e.preventDefault()
    setSome('ähej')
  }

  const onSignIn = (e: SyntheticEvent) => {
    e.preventDefault()
    axios.post('http://127.0.0.1:5001/api/v1/auth/signup', { email, password }, { withCredentials: true })
      .then(res => {
        console.log(res)
        setSome(res.data)
      })
  }

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault()
    socket.emit('sendMessage', someText);
  }

  const toggleForm = () => setIsLoginForm(currentForm => !currentForm)

  return (
    <div className="App">
      <button onClick={toggleForm}>{isLoginForm ? 'sign up' : 'to log in'}</button>
      <form onSubmit={isLoginForm ? onLogin : onSignIn}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='email' />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='*******' />
        <button type='submit'>Send</button>
      </form>
      <div>{some && JSON.stringify(some)}</div>
      {!!some && (
        <>
          <form onSubmit={sendMessage}>
            <textarea onChange={(e) => setSomeText(e.target.value)} name="message" id="message" cols={30} rows={10}></textarea>
            <button type='submit'>send message</button>
          </form>
          <p>{lastPong && lastPong}</p>
        </>
      )}
    </div>
  )
}

export default App
