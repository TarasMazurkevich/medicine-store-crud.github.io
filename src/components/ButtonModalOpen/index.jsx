import React from 'react';
import { useDispatch } from 'react-redux';
import { setMedicineModalIsVisible, setMedicineModalMethod } from '../../store/actions';

const ButtonModalOpen = () => {
  const dispatch = useDispatch();

  const openCreatModal = (e) => {
    e.preventDefault();
    
    dispatch(setMedicineModalMethod('CREATE'));
    window.setFormDataState({
      code: '',
      name: '',
      price: 0,
      shelfLife: 0,
      compositionAndFormOfRelease: '',
      indication: '',
      сontraindications: ''
    });
    dispatch(setMedicineModalIsVisible(true));
  }

  return (
    <button onClick={openCreatModal}>Add</button>
  );
}

export default ButtonModalOpen;
