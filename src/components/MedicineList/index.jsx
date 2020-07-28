import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import firebase, { myFirestoreCollection } from '../../firebase';
import 'firebase/firestore';

import { deleteMedicine, setMedicineModalIsVisible, setMedicineModalMethod, setCurrentMedicineIndex } from '../../store/actions';
import { SET_MEDICINES } from '../../store/actions';

import MedicineItem from '../MedicineItem';

const MedicineList = () => {
  const dispatch = useDispatch();
  const medicines = useSelector(state => state.medicines);

  const openEditModal = (method, currentMedicineIndex) => {
    dispatch(setMedicineModalMethod(method));
    dispatch(setCurrentMedicineIndex(currentMedicineIndex));

    window.setFormDataState(medicines[currentMedicineIndex]);
    dispatch(setMedicineModalIsVisible(true));
  }

  const deleteMedicineHandler = (medicine, currentMedicineIndex) => {
    firebase
      .firestore()
      .collection(myFirestoreCollection)
      .doc(medicine.id)
      .delete()
  }

  return (
    <ul>
      {medicines.map((medicine, i) =>
        <MedicineItem
          key={i}
          {...medicine}
          openEditModal={() => openEditModal('EDIT', i)}
          deleteMedicine={() => deleteMedicineHandler(medicine, i)}
        />
      )}
    </ul>
  );
}

export default MedicineList;
