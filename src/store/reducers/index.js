import { combineReducers } from 'redux';

import medicines from './medicines';
import medicineModalForm from './medicineModalForm';

export default combineReducers({
  medicines,
  medicineModalForm
});