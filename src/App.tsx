import { SyntheticEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [some, setSome] = useState<any>(null)

  const [isLoginForm, setIsLoginForm] = useState(true)

  useEffect(() => {
    if(!some) return
    // socket enter
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

  const sendMessage = () => {

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
        <form onSubmit={sendMessage}>
          <textarea name="message" id="message" cols={30} rows={10}></textarea>
          <button type='submit'>send message</button>
        </form>
      )}
    </div>
  )
}

export default App
