// Import CONST for types
import { SET_MEDICINES, ADD_MEDICINE, EDIT_MEDICINE, DELETE_MEDICINE } from '../actions';

const medicines = (state = [], action) => {
  switch (action.type) {
    case SET_MEDICINES:
      return [...action.medicines];

    case ADD_MEDICINE:
      return [
        ...state,
        action.data
      ];

    case EDIT_MEDICINE:
      const cloneEditMedicines = [...state];
      cloneEditMedicines[action.index] = action.data;
      return cloneEditMedicines;

    case DELETE_MEDICINE:
      const cloneDeleteMedicines = [...state];
      cloneDeleteMedicines.splice(action.index, 1);
      return cloneDeleteMedicines;

    default:
      return state;
  }
}

export default medicines;
