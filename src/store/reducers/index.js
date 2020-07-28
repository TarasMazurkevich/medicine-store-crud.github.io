import { combineReducers } from 'redux';

import medicines from './medicines';
import medicineModalForm from './medicineModalForm';
import alert from './alert';

export default combineReducers({
  medicines,
  medicineModalForm,
  alert
});