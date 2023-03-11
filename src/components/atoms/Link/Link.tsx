import { StyledLink } from "./styled"

type OwnProps = {
  text: string
  onClick: () => void
}

type Props = OwnProps

const Link: React.FC<Props> = ({ text, onClick }) => {
  return (
    <StyledLink onClick={onClick}>{text}</StyledLink>
  )
}

export default Link