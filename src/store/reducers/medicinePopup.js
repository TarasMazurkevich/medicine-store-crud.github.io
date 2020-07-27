import { SET_MEDICINE_POPUP_METHOD, SET_CURRENT_MEDICINE_INDEX } from '../actions';

import { PopupTypeMethods } from '../actions';

const medicinePopup = (state = {method: PopupTypeMethods.CREATE, currentMedicineIndex: -1}, action) => {
  switch (action.type) {
    case SET_MEDICINE_POPUP_METHOD:
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

export default medicinePopup;
