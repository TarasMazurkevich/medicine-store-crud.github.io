import { SET_MEDICINE_MODAL_VISIBLE, SET_MEDICINE_MODAL_METHOD, SET_CURRENT_MEDICINE_INDEX } from '../actions';

import { ModalTypeMethods } from '../actions';

const medicineModalForm = (state = {isVisible: false, method: ModalTypeMethods.CREATE, currentMedicineIndex: -1}, action) => {
  switch (action.type) {
    case SET_MEDICINE_MODAL_VISIBLE:
      return {
        ...state,
        isVisible: action.isVisible
      }
    case SET_MEDICINE_MODAL_METHOD:
      return {
        ...state,
        method: action.method
      }

    case SET_CURRENT_MEDICINE_INDEX:
      return {
        ...state,
        currentMedicineIndex: action.currentMedicineIndex
      }

    default:
      return state;
  }
}

export default medicineModalForm;
