import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import MedicineList from '../MedicineList';
import MedicineModalForm from '../MedicineModalForm';
import ButtonModalOpen from '../ButtonModalOpen';

const App = () => (
  <main>
    <Container>
      <Row>
        <Col>
          <MedicineList />
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonModalOpen />
        </Col>
      </Row>
      <MedicineModalForm />
    </Container>
  </main>
);

export default App;