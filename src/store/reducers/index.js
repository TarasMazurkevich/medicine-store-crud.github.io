import { combineReducers } from 'redux';

import medicines from './medicines';
import medicinePopup from './medicinePopup';

export default combineReducers({
  medicines,
  medicinePopup
});