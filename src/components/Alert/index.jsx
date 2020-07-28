import React from 'react';

const Alert = ({ type, alertRef, errorList }) => {
  return (
    <div ref={alertRef}>
      {errorList.map((error, i) => 
        <p key={i}>{error}</p>
      )}
    </div>
  );
}

export default Alert;
