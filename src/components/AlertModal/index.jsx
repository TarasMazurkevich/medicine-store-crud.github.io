import React from 'react';
import { useSelector } from 'react-redux';

import './alertModal.scss';

const AlertModal = ({ type, errorList }) => {
  const isVisible = useSelector(state => state.alert.isVisible); 

  if (isVisible) {
    return (
      <div>
        {errorList.map((error, i) => 
          <p key={i}>{error}</p>
        )}
      </div>
    );
  } else {
    return '';
  }
  
}

export default AlertModal;
