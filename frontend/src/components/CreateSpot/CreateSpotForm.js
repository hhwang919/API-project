import { nanoid } from 'nanoid';
import CreateSpot from './SpotForm';


const CreateSpotForm = () => {
  const spot = {
    id: nanoid(5),
    address: '',
    City: '',
    // checkedOut: false,
  };

  return (
    <CreateSpot spot={spot} formType="Create Spot" />
    // <input type="submit" value={formType} />
  );
}

export default CreateSpotForm;
