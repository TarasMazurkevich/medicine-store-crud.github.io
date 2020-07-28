import React from 'react';
import PropTypes from 'prop-types';

const MedicineItem = ({ code, name, price, openEditModal, deleteMedicine }) => {
  return (
    <li>
      <div>
        <p>{code}</p>
        <p>{name}</p>
        <p>{price}</p>
      </div>
      <div>
        <button onClick={openEditModal}>Edit</button>
        <button onClick={deleteMedicine}>Delete</button>
      </div>
    </li>
  );
}

MedicineItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  openEditModal: PropTypes.func.isRequired,
  deleteMedicine: PropTypes.func.isRequired
}

export default MedicineItem;
