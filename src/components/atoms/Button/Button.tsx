import { FC } from "react"

type ButtonProps = {
  label: string
}

type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<Props> = ({ label, ...props }) => {
  return <button {...props}>{label}</button>
}

export default Button