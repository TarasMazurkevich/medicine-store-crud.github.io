import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addMedicine, editMedicine, setMedicineModalIsVisible, setAlertIsVisible } from '../../store/actions';

import Alert from '../Alert';

const MedicinePopup = () => {
  
  const dispatch = useDispatch();

  const medicines = useSelector(state => state.medicines);
  const modalFormStore = useSelector(state => state.medicineModalForm);
  
  const modalIsVisible = modalFormStore.isVisible;
  const modalFormMethod = modalFormStore.method;
  const currentMedicineIndex = modalFormStore.currentMedicineIndex;
  const currentMedicine = medicines[currentMedicineIndex];

  // Create local state for modal --------------------------------------------------
  const [formDataState, setFormDataState] = useState({
    code: '',
    name: '',
    price: 0,
    shelfLife: 0,
    compositionAndFormOfRelease: '',
    indication: '',
    сontraindications: ''
  });
  window.setFormDataState = setFormDataState;
  window.formDataState = formDataState;

  const [step, setStep] = useState(1);
  const [alertErrorList, setAlertErrorList] = useState([]);


  // --------------------------------------

  const validationRules = {
    firstStep: {
      code: (value) => {
        if (value.length < 5 || value.length > 10) {
          return {
            result: false,
            error: 'Code: строка должна быть длиной от 5 до 10 символов'
          }
        } else {
          return {
            result: true,
            error: undefined
          }
        }
      },
      name: (value) => {
        if (!value || value.length < 5 || value.length > 100 || typeof value !== 'string') {
          return {
            result: false,
            error: 'Name: трока должна быть длиной от 5 до 100 символов'
          }
        } else {
          return {
            result: true,
            error: undefined
          }
        }
      },
      price: (value) => {
        if (!+value || +value < 0.01 || +value > 1000000 || typeof +value !== 'number') {
          return {
            result: false,
            error: 'Price: число должно быть дленной от 5 до 100 символов'
          }
        } else {
          return {
            result: true,
            error: undefined
          }
        }
      },
      shelfLife: (value) => {
        if (!+value || +value.length < 1 || +value.length > 1000 || typeof +value !== 'number') {
          return {
            result: false,
            error: 'Expiration date: число должно быть дленной от 1 до 1000 символов'
          }
        } else {
          return {
            result: true,
            error: undefined
          }
        }
      }
    },
    secondStep: {
      compositionAndFormOfRelease: (value) => {
        if (value.length > 2000) {
          return {
            result: false,
            error: 'Composition and releases form: строка должна быть дленной до 2000 символов'
          }
        } else {
          return {
            result: true,
            error: undefined
          }
        }
      },
      indication: (value) => {
        if (value.length > 2000) {
          return {
            result: false,
            error: 'Indication: строка должна быть дленной до 2000 символов'
          }
        } else {
          return {
            result: true,
            error: undefined
          }
        }
      },
      сontraindications: (value) => {
        if (value.length > 2000) {
          return {
            result: false,
            error: 'Contrindicator: строка должна быть дленной до 2000 символов'
          }
        } else {
          return {
            result: true,
            error: undefined
          }
        }
      }
    }
  }

  // --------------------------------------
  
  /**
   * [description]
   * @param  {object} formData - 
   * @return {array}          - Error info for user
   */
  const validateForm = (formData) => {

    let validate = step === 1 ? validationRules.firstStep : validationRules.secondStep;
    let errorMessage = [];
    
    for(let key in validate) {
      let validateResult = validate[key](formData[key]);

      if(!validateResult.result) {
        errorMessage.push(`${validateResult.error}`);
      }
    }

    setAlertErrorList(errorMessage);
    return errorMessage;

  }

  /**
   * onChange event for imput (take input.value and save it to state)
   * @param  {object} e - event object
   */
  const onChangeHandler = (e) => {
    const input = e.target;
    const inputName = input.name;
    const inputValue = inputName === 'price' || inputName === 'shelfLife' ? +input.value : input.value;

    setFormDataState({
      ...formDataState,
      [inputName]: inputValue
    });
  }

  const closePopup = () => {
    dispatch(setMedicineModalIsVisible(false));
    dispatch(setAlertIsVisible(false));
    setAlertErrorList([]);
    setStep(1);
  }

  const goToNextStep = () => {
    const errorMessage = validateForm(formDataState);
    if (errorMessage.length === 0) {
      dispatch(setAlertIsVisible(false));
      setStep(2);
    } else {
      dispatch(setAlertIsVisible(true));
    }
    
  }

  const goToPrevStep = () => {
    dispatch(setAlertIsVisible(false));
    setStep(1);
  }

  /**
   * Take data from state and edit current medicine
   * @param  {object} e - event object
   */
  const editCurrentMedicine = (e) => {
    e.preventDefault();

    const errorMessage = validateForm(formDataState);

    if (errorMessage.length === 0) {
      dispatch(editMedicine(formDataState, currentMedicineIndex));
      dispatch(setMedicineModalIsVisible(false));
      dispatch(setAlertIsVisible(false));
      setStep(1);
    } else {
      dispatch(setAlertIsVisible(true));
    }
    
  }

  /**
   * Take data from state and create new medicine
   * @param  {object} e - event object
   */
  const createNewMedicine = (e) => {
    e.preventDefault();

    const errorMessage = validateForm(formDataState);
    if (errorMessage.length === 0) {
      dispatch(addMedicine(formDataState));
      dispatch(setMedicineModalIsVisible(false));
      dispatch(setAlertIsVisible(false));
      setStep(1);
    } else {
      dispatch(setAlertIsVisible(true));
    }
    
  }

  if (modalIsVisible === true) {
    return (
      <div id="ModalForm">
        <form onSubmit={(e) => {e.preventDefault()}}>
          <h2>
            {modalFormMethod === 'EDIT' ? 'Edit' : 'Add'} medicine {step}/2
          </h2>
          <div>
            {step === 1 ?
              (<div>
                <label>
                  Code: <input type="text" name="code" value={formDataState.code} onChange={onChangeHandler} />
                </label>
                <label>
                  Name: <input type="text" name="name" value={formDataState.name} onChange={onChangeHandler} />
                </label>
                <label>
                  Price: <input type="number" name="price" value={formDataState.price} onChange={onChangeHandler} />
                </label>
                <label>
                  Expiration date: <input type="number" name="shelfLife" value={formDataState.shelfLife} onChange={onChangeHandler} />
                </label>
              </div>)
              :
              (<div>
                <label>
                  Composition and releases form: <input type="text" name="compositionAndFormOfRelease" value={formDataState.compositionAndFormOfRelease} onChange={onChangeHandler} />
                </label>
                <label>
                  Indication: <input type="text" name="indication" value={formDataState.indication} onChange={onChangeHandler} />
                </label>
                <label>
                  Contrindicator: <input type="text" name="сontraindications" value={formDataState.сontraindications} onChange={onChangeHandler} />
                </label>
                
                
              </div>)
            }
          </div>
          <div>
            <button onClick={closePopup}>Cancel</button>
            {step === 1 ?
              (<button onClick={goToNextStep}>Next</button>)
              :
              (<button onClick={goToPrevStep}>Prev</button>)
            }
            {step > 1 && modalFormMethod === 'EDIT' ? (<button onClick={editCurrentMedicine}>Edit</button>) : ''}
            {step > 1 && modalFormMethod === 'CREATE' ? (<button onClick={createNewMedicine}>Create</button>) : ''}
          </div>
        </form>
        <Alert errorList={alertErrorList} type="error" />
      </div>
    );
  } else {
    return '';
  }
  
}

export default MedicinePopup;
