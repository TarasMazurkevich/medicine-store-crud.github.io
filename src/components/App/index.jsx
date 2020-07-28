import React from 'react';
import MedicineList from '../MedicineList';
import MedicineModalForm from '../MedicineModalForm';
import ButtonModalOpen from '../ButtonModalOpen';

const App = () => (
  <main>
    <MedicineList />
    <ButtonModalOpen />
    <MedicineModalForm />
  </main>
);

export default App;