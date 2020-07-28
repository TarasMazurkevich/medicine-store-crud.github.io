// Action for MEDICINE LIST
// ---------------------------------------------
export const SET_MEDICINES = 'SET_MEDICINES';
export const ADD_MEDICINE = 'ADD_MEDICINE';
export const EDIT_MEDICINE = 'EDIT_MEDICINE';
export const DELETE_MEDICINE = 'DELETE_MEDICINE';

export const setMedicines = medicines => ({
  type: SET_MEDICINES,
  medicines
});

export const addMedicine = data => ({
  type: ADD_MEDICINE,
  data
});

export const editMedicine = (data, index) => ({
  type: EDIT_MEDICINE,
  data,
  index
});

export const deleteMedicine = index => ({
  type: DELETE_MEDICINE,
  index
});

// Action for MEDICINE POPUP
// ---------------------------------------------
export const SET_MEDICINE_MODAL_METHOD = 'SET_MEDICINE_MODAL_METHOD';
export const SET_CURRENT_MEDICINE_INDEX = 'SET_CURRENT_MEDICINE_INDEX';

export const ModalTypeMethods = {
  CREATE: 'CREATE',
  EDIT: 'EDIT'
}

export const setMedicineModalMethod = method => ({
  type: SET_MEDICINE_MODAL_METHOD,
  method
});

export const setCurrentMedicineIndex = currentMedicineIndex => ({
  type: SET_CURRENT_MEDICINE_INDEX,
  currentMedicineIndex
});
