import { CreateSpaceBanner } from "./styled"

type OwnProps = {
  onCancel: () => void
}

type Props = OwnProps

const CreateSpace: React.FC<Props> = ({ onCancel }) => {
  return (<CreateSpaceBanner>
    <label htmlFor="spaceName">Name:</label>
    <input type="text" id="spaceName"/>
    <button>Create space</button>
    <button onClick={onCancel}>Cancel</button>
  </CreateSpaceBanner>)
}

export default CreateSpace