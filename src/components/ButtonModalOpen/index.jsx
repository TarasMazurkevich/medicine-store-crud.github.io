import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, ButtonGroup } from 'reactstrap';

import { setMedicineModalIsVisible, setMedicineModalMethod } from '../../store/actions';

const ButtonModalOpen = () => {
  const dispatch = useDispatch();

  const openCreatModal = (e) => {
    e.preventDefault();
    
    dispatch(setMedicineModalMethod('CREATE'));
    dispatch(setMedicineModalIsVisible(true));
  }

  return (
    <ButtonGroup>
      <Button color="primary" onClick={openCreatModal}>Add</Button>
    </ButtonGroup>
  );
}

export default ButtonModalOpen;
