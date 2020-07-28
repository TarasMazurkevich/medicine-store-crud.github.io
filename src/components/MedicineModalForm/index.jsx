import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Row, Col, Container } from "reactstrap";

import firebase, { myFirestoreCollection } from '../../firebase';
import 'firebase/firestore';

import { addMedicine, editMedicine, setMedicineModalIsVisible, setAlertIsVisible } from '../../store/actions';
import { SET_MEDICINES } from '../../store/actions';

import AlertModal from '../AlertModal';

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
            error: 'Price: число должно быть длиной от 0.01 до 1000000 символов'
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
            error: 'Expiration date: число должно быть длиной от 1 до 1000 символов'
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
            error: 'Composition and releases form: строка должна быть длиной до 2000 символов'
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
            error: 'Indication: строка должна быть длиной до 2000 символов'
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
            error: 'Contrindicator: строка должна быть длиной до 2000 символов'
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
  
  const resetModalState = () => {
    dispatch(setMedicineModalIsVisible(false));
    dispatch(setAlertIsVisible(false));
    setAlertErrorList([]);
    setStep(1);
    setFormDataState({
      code: '',
      name: '',
      price: 0,
      shelfLife: 0,
      compositionAndFormOfRelease: '',
      indication: '',
      сontraindications: ''
    });
  }
  
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
  
  const onChangeHandler = (e) => {
    const input = e.target;
    const inputName = input.name;
    const inputValue = inputName === 'price' || inputName === 'shelfLife' ? +input.value : input.value;

    setFormDataState({
      ...formDataState,
      [inputName]: inputValue
    });
  }

  const closeModal = () => {
    resetModalState();
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
  
  const editCurrentMedicine = (e) => {
    e.preventDefault();

    const errorMessage = validateForm(formDataState);

    if (errorMessage.length === 0) {
      firebase
        .firestore()
        .collection(myFirestoreCollection)
        .doc(medicines[currentMedicineIndex].id)
        .update(formDataState)
        .then(() => {
          resetModalState();
        });
    } else {
      dispatch(setAlertIsVisible(true));
    }
  }

  const createNewMedicine = (e) => {
    e.preventDefault();

    const errorMessage = validateForm(formDataState);
    if (errorMessage.length === 0) {
      firebase
        .firestore()
        .collection(myFirestoreCollection)
        .add(formDataState)
        .then(() => {
          resetModalState();
        });
    } else {
      dispatch(setAlertIsVisible(true));
    }
  }

  if (modalIsVisible === true) {
    return (
      <Modal isOpen={modalIsVisible} toggle={closeModal}>
        <Container>
          <Row>
            <Col>
              <ModalHeader>{modalFormMethod === 'EDIT' ? 'Edit' : 'Add'} medicine {step}/2</ModalHeader>
                <ModalBody>
                  <Form>
                    {step === 1 ?
                      (<div>
                        <FormGroup>
                          <Label>
                            Code: <Input type="text" name="code" value={formDataState.code} onChange={onChangeHandler} />
                          </Label>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Name: <Input type="text" name="name" value={formDataState.name} onChange={onChangeHandler} />
                          </Label>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Price: <Input type="number" step="0.01" name="price" value={formDataState.price} onChange={onChangeHandler} />
                          </Label>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Expiration date: <Input type="number" name="shelfLife" value={formDataState.shelfLife} onChange={onChangeHandler} />
                          </Label>
                        </FormGroup>
                      </div>)
                      :
                      (<div>
                        <FormGroup>
                          <Label>
                            Composition and releases form: <Input type="textarea" name="compositionAndFormOfRelease" value={formDataState.compositionAndFormOfRelease} onChange={onChangeHandler} />
                          </Label>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Indication: <Input type="textarea" name="indication" value={formDataState.indication} onChange={onChangeHandler} />
                          </Label>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Contrindicator: <Input type="textarea" name="сontraindications" value={formDataState.сontraindications} onChange={onChangeHandler} />
                          </Label>
                        </FormGroup>
                      </div>)
                    }
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <ButtonGroup>
                    <Button color="danger" onClick={closeModal}>Cancel</Button>
                    {step === 1 ?
                      (<Button color="primary" onClick={goToNextStep}>Next</Button>)
                      :
                      (<Button color="primary" onClick={goToPrevStep}>Prev</Button>)
                    }
                    {step > 1 && modalFormMethod === 'EDIT' ? (<Button color="primary" onClick={editCurrentMedicine}>Edit</Button>) : ''}
                    {step > 1 && modalFormMethod === 'CREATE' ? (<Button color="primary" onClick={createNewMedicine}>Create</Button>) : ''}
                  </ButtonGroup>
                </ModalFooter>
                <Alert color="danger">
                  <AlertModal errorList={alertErrorList} type="error" />
                </Alert>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  } else {
    return '';
  }
  
}

export default MedicinePopup;
