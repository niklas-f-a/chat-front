import { useQuery, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { api } from "../../api"
import { UserCred } from "../../App"
import Button from "../../components/atoms/Button"
import InputField from "../../components/atoms/InputField"
import Link from "../../components/atoms/Link"
import { useAuth } from "../../hooks"
import { Form, FormWrapper } from "./styled"

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const LoggedOut: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true)

  const { mutateLogin, mutateSignup } = useAuth()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    isLoginForm
      ? mutateLogin.mutate({ email, password })
      : mutateSignup.mutate({ email, password })
  };

  const toggleForm = () => setIsLoginForm(!isLoginForm)

  const onChangeUsername = (e: ChangeEvent) =>
    setEmail(e.target.value)

  const onChangePassword = (e: ChangeEvent) =>
    setPassword(e.target.value)

  return (
    <FormWrapper>
      <Form onSubmit={submit}>
        {mutateLogin.isError && <p style={{ color: 'black' }}>Something went wrong</p>}
        <InputField label="Username" onChange={onChangeUsername} />
        <InputField label="Password" type="password" onChange={onChangePassword} />
        <Button label={isLoginForm ? 'Login' : 'SignUp'} type="submit" />
        <Link text={isLoginForm ? 'signup' : 'back'} onClick={toggleForm} />
        {mutateSignup.isError && <p style={{ color: 'black' }}>Something went wrong</p>}
      </Form>
        {isLoginForm && (
          <div>
            <a href='http://localhost:5001/api/v1/auth/github/login'>
              <Button label="Login to GitHub" />
            </a>
          </div>
        )}
    </FormWrapper>
  )
}

export default LoggedOut