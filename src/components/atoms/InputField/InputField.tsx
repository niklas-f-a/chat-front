import { Input } from "./styled"

type OwnProps = {
  stretch?: boolean
  label?: string
}

type Props = React.InputHTMLAttributes<HTMLInputElement> & OwnProps

const InputField: React.FC<Props> = ({stretch, label, ...props}) => {
  return (
    <Input>
      {!!label && <label>{label}</label>}
      <input {...props} />
    </Input>
  )
}

export default InputField