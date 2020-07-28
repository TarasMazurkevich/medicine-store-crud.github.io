import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteMedicine, setMedicineModalMethod, setCurrentMedicineIndex } from '../../store/actions';

import MedicineItem from '../MedicineItem';

const MedicineList = () => {
  const dispatch = useDispatch();
  const medicines = useSelector(state => state.medicines);

  const openEditModal = (method, currentMedicineIndex) => {
    dispatch(setMedicineModalMethod(method));
    dispatch(setCurrentMedicineIndex(currentMedicineIndex));

    window.setFormDataState(medicines[currentMedicineIndex]);
    window.popupRef.current.style.display = 'block';
  }

  const deleteMedicine = (currentMedicineIndex) => {
    dispatch(deleteMedicine(currentMedicineIndex));
  }

  return (
    <ul>
      {medicines.map((medicine, i) =>
        <MedicineItem
          key={i}
          {...medicine}
          openEditModal={() => openEditModal('EDIT', i)}
          deleteMedicine={() => deleteMedicine(i)}
        />
      )}
    </ul>
  );
}

export default MedicineList;
