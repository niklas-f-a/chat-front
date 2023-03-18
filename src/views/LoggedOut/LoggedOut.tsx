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
  // const { isLoading, error, data, refetch } = useQuery({
  //   queryKey: ['auth'],
  //   queryFn: get,
  //   refetchOnWindowFocus: false,
  //   enabled: false
  // })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginForm, setIsLoginForm] = useState(true)

  async function login() {
    return await api.auth.signup({ email, password })

    // const data = await res.json()
    // return data
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    // refetch()
    const data = await login()
    // console.log(data)
  }

  const toggleForm = () => setIsLoginForm(!isLoginForm)

  const onChangeUsername = (e: ChangeEvent) =>
    setEmail(e.target.value)

  const onChangePassword = (e: ChangeEvent) =>
    setPassword(e.target.value)

  return (
    <FormWrapper>
      <Form onSubmit={submit}>
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