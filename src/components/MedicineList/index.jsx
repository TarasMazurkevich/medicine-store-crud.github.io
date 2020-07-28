import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Table } from 'reactstrap';

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
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Code</th>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {medicines.map((medicine, i) =>
          <MedicineItem
            key={i}
            {...medicine}
            medicineNumber={i + 1}
            openEditModal={() => openEditModal('EDIT', i)}
            deleteMedicine={() => deleteMedicineHandler(medicine, i)}
          />
        )}
      </tbody>
    </Table>
  );
}

export default MedicineList;
