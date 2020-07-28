import React from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonGroup } from 'reactstrap';

const MedicineItem = ({ code, name, price, medicineNumber, openEditModal, deleteMedicine }) => {
  return (
    <tr>
      <th scope="row">{medicineNumber}</th>
      <td>{code}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <ButtonGroup>
          <Button color="primary" onDoubleClick={openEditModal}>Edit</Button>
          <Button color="danger" onClick={deleteMedicine}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

MedicineItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  medicineNumber: PropTypes.number.isRequired,
  openEditModal: PropTypes.func.isRequired,
  deleteMedicine: PropTypes.func.isRequired
}

export default MedicineItem;
