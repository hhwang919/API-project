import { nanoid } from 'nanoid';
import CreateSpot from './SpotForm';


const CreateSpotForm = () => {
  const spot = {
    id: nanoid(5),
    address: '',
    City: '',
  };

  return (
    <CreateSpot spot={spot} formType="Create Spot" />
  );
}

export default CreateSpotForm;
