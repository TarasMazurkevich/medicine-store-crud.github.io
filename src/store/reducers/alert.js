import { SET_ALERT_VISIBLE } from '../actions';

const medicineModalForm = (state = {isVisible: false}, action) => {
  switch (action.type) {
    case SET_ALERT_VISIBLE:
      return {
        isVisible: action.isVisible
      }

    default:
      return state;
  }
}

export default medicineModalForm;
