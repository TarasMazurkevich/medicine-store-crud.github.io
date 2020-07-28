import React from 'react';
import { createStore } from 'redux';

import { setMedicines, addMedicine, editMedicine, deleteMedicine } from "./actions";
import rootReducer from './reducers';

import { render, screen } from '@testing-library/react';

const store = createStore(rootReducer);

describe('Redux Store', () => {
  test('Set fake medicine list in store', () => {
    const fakeMedicineList = [
      {
        code: '00001',
        name: 'Medicine 1',
        price: 0,
        shelfLife: 0,
        compositionAndFormOfRelease: 'Lorem',
        indication: 'Lorem',
        сontraindications: 'Lorem'
      },
      {
        code: '00002',
        name: 'Medicine 2',
        price: 0,
        shelfLife: 0,
        compositionAndFormOfRelease: '',
        indication: '',
        сontraindications: ''
      }
    ];
    const setMedicinesCallback = (medicines) => {
      store.dispatch(setMedicines(medicines));

      return true;
    }

    expect(setMedicinesCallback(fakeMedicineList))
      .toBe(store.getState('medicines').medicines.length === 2);
  });

  test('Add fake medicine to store', () => {
    const fakeMedicine = {
      code: '00005',
      name: 'Medicine 5',
      price: 5,
      shelfLife: 5,
      compositionAndFormOfRelease: 'Lorem',
      indication: 'Lorem',
      сontraindications: 'Lorem'
    };
    const addMedicineCallback = (medicine) => {
      store.dispatch(addMedicine(medicine));

      return true;
    }

    expect(addMedicineCallback(fakeMedicine))
      .toBe(store.getState('medicines').medicines.length === 3);
  });

  test('Edit fake medicine in store', () => {
    const fakeMedicine = {
      code: 'FakeMedicineCode',
      name: 'Medicine Fake',
      price: 5,
      shelfLife: 5,
      compositionAndFormOfRelease: 'Lorem',
      indication: 'Lorem',
      сontraindications: 'Lorem'
    };
    const currentMedicineIndex = 2;

    const editMedicineCallback = (medicine, index) => {
      store.dispatch(editMedicine(medicine, index));

      return true;
    }

    expect(editMedicineCallback(fakeMedicine, currentMedicineIndex))
      .toBe(store.getState('medicines').medicines[currentMedicineIndex].code === fakeMedicine.code);
  });

  test('Delete fake medicine in store', () => {
    const currentMedicineIndex = 1;

    const deleteMedicineCallback = (index) => {
      store.dispatch(deleteMedicine(index));

      return true;
    }

    expect(deleteMedicineCallback(currentMedicineIndex))
      .toBe(store.getState('medicines').medicines.length === 2);
  });
});