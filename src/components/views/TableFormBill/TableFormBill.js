import { Row, Col, Form } from 'react-bootstrap';

const TableFormBill = (props) => {
  return (
    <Form.Group
      as={Row}
      className='mb-4 align-items-center flex-nowrap'
      controlId='formTableBill'
    >
      <Col className='m-0 col-sm-2 col-form-label'>
        <Form.Label className='m-0 fw-bold'>Bill:</Form.Label>
      </Col>
      <Col className='m-0 col-auto'>
        <Form.Text className='m-0 fs-6'>$</Form.Text>
      </Col>
      <Col className='m-0 col-sm-5 col-md-3'>
        <Form.Control
          type='number'
          value={props.bill}
          placeholder='0'
          onChange={(e) => props.setBill(e.target.value)}
        />
      </Col>
    </Form.Group>
  );
};

export default TableFormBill;
