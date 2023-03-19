import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { api } from "../../api"
import { UserCred } from "../../App"
import Button from "../../components/atoms/Button"
import InputField from "../../components/atoms/InputField"
import Link from "../../components/atoms/Link"
import { Form, FormWrapper } from "./styled"

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const LoggedOut: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginForm, setIsLoginForm] = useState(true)

  const login = async () => {
    const data = await api.auth.signup({ email, password })
    console.log(data)
    return data
  }

  const signup = async () => {
    return await api.auth.login({ email, password })
  }

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['auth'],
    queryFn: isLoginForm ? signup : login,
    refetchOnWindowFocus: false,
    enabled: false,
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
  }

  const toggleForm = () => setIsLoginForm(!isLoginForm)

  const onStatus = async () => {
    await api.auth.status()
  }

  const onChangeUsername = (e: ChangeEvent) =>
    setEmail(e.target.value)

  const onChangePassword = (e: ChangeEvent) =>
    setPassword(e.target.value)

  return (
    <FormWrapper>
      {data && JSON.stringify(data)}
      <Form onSubmit={submit}>
        <InputField label="Username" onChange={onChangeUsername} />
        <InputField label="Password" type="password" onChange={onChangePassword} />
        <Button label={isLoginForm ? 'Login' : 'SignUp'} type="submit" />
        <Link text={isLoginForm ? 'signup' : 'back'} onClick={toggleForm} />
      </Form>
        {isLoginForm && <div><a href='http://localhost:5001/api/v1/auth/github/login'><Button label="Login to GitHub" />
</a></div>}
        {isLoginForm && <div><Button label="Status" onClick={onStatus} /></div>}
    </FormWrapper>
  )
}

export default LoggedOut