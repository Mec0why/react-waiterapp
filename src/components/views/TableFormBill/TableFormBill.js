import { Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
          type='text'
          value={props.bill}
          placeholder='0'
          onChange={(e) => props.setBill(parseInt(e.target.value || 0))}
        />
      </Col>
    </Form.Group>
  );
};

export default TableFormBill;

TableFormBill.propTypes = {
  setBill: PropTypes.func.isRequired,
  bill: PropTypes.number.isRequired,
};
