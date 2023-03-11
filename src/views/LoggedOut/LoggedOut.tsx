import { useState } from "react"
import Button from "../../components/atoms/Button"
import InputField from "../../components/atoms/InputField"
import Link from "../../components/atoms/Link"
import { Form, FormWrapper } from "./styled"

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const LoggedOut = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginForm, setIsLoginForm] = useState(true)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //isLoginForm ? api login : api signup
  }

  const toggleForm = () => setIsLoginForm(!isLoginForm)

  const onChangeUsername = (e: ChangeEvent) =>
    setUsername(e.target.value)

  const onChangePassword = (e: ChangeEvent) =>
    setPassword(e.target.value)

  return (
    <FormWrapper>
      <Form onSubmit={onSubmit}>
        <InputField label="Username" onChange={onChangeUsername} />
        <InputField label="Password" type="password" onChange={onChangePassword} />
        <Button label={isLoginForm ? 'Login' : 'SignUp'} type="submit" />
        {isLoginForm && <div>github login</div>}
        <Link text={isLoginForm ? 'signup' : 'back'} onClick={toggleForm} />
      </Form>
    </FormWrapper>
  )
}

export default LoggedOut