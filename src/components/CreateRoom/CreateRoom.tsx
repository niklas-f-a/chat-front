import { useState } from "react"
import { CreateSpaceBanner } from "./styled"

type OwnProps = {
  onCancel: () => void
  onCreateSpace: (spaceName: string) => void
}

type Props = OwnProps

const CreateSpace: React.FC<Props> = ({ onCancel, onCreateSpace }) => {
  const [spaceName, setSpaceName] = useState('')

  return (
    <CreateSpaceBanner>
      <label htmlFor="spaceName">Name:</label>
      <input onChange={e => setSpaceName(e.target.value)} type="text" id="spaceName"/>
      <button onClick={() => onCreateSpace(spaceName)}>Create space</button>
      <button onClick={onCancel}>Cancel</button>
    </CreateSpaceBanner>
  )
}

export default CreateSpace