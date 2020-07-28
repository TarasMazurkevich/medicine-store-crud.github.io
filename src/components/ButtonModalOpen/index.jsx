import React from 'react';
import { useDispatch } from 'react-redux';
import { setMedicineModalMethod } from '../../store/actions';

const ButtonModalOpen = () => {
  const dispatch = useDispatch();

  const openCreatModal = (e) => {
    e.preventDefault();
    
    dispatch(setMedicineModalMethod('CREATE_MEDICINE'));
    window.setFormDataState({
      code: '',
      name: '',
      price: 0,
      shelfLife: 0,
      compositionAndFormOfRelease: '',
      indication: '',
      сontraindications: ''
    });
    window.popupRef.current.style.display = 'block';
  }

  return (
    <button onClick={openCreatModal}>Add</button>
  );
}

export default ButtonModalOpen;
