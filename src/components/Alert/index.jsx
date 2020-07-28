import React from 'react';
import { useSelector } from 'react-redux';

const Alert = ({ type, errorList }) => {
  const isVisible = useSelector(state => state.alert.isVisible);

  if (isVisible) {
    return (
      <div id="Alert">
        {errorList.map((error, i) => 
          <p key={i}>{error}</p>
        )}
      </div>
    );
  } else {
    return '';
  }
  
}

export default Alert;
