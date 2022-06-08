import styles from '../TableFormPeople/TableFormPeople.module.scss';
import { Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TableFormPeople = (props) => {
  return (
    <Form.Group
      as={Row}
      className='mb-4 align-items-center'
      controlId='formTablePeople'
    >
      <Col className='m-0 col-sm-2 col-form-label'>
        <Form.Label className='m-0 fw-bold'>People:</Form.Label>
      </Col>
      <Col className='m-0 pe-2 col-auto'>
        <Form.Control
          {...props.register('people', {
            required: true,
            min: 0,
            max: 10,
          })}
          type='text'
          value={props.people}
          placeholder='0'
          onChange={(e) => props.setPeople(parseInt(e.target.value) || 0)}
          className={styles.people}
        />
      </Col>
      <Col className='m-0 p-0 col-auto'>
        <Form.Text className='m-0'>/</Form.Text>
      </Col>
      <Col className='m-0 ps-2 col-auto'>
        <Form.Control
          {...props.register('maxPeople', {
            required: true,
            min: 0,
            max: 10,
          })}
          type='text'
          value={props.maxPeople}
          placeholder='10'
          onChange={(e) => props.setMaxPeople(parseInt(e.target.value) || 0)}
          className={styles.people}
        />
      </Col>
      {props.peopleError && !props.errors.people && !props.errors.maxPeople && (
        <small className='d-block form-text text-danger mt-2'>
          Value has been updated. <br />
          People amount cannot be lower than Max People amount.
        </small>
      )}
      {props.errors.people && (
        <small className='d-block form-text text-danger mt-2'>
          People amount cannot be lower than 0 and greater than 10.
        </small>
      )}
      {props.errors.maxPeople && (
        <small className='d-block form-text text-danger mt-2'>
          Max People amount cannot be lower than 0 and greater than 10.
        </small>
      )}
    </Form.Group>
  );
};

export default TableFormPeople;

TableFormPeople.propTypes = {
  register: PropTypes.func.isRequired,
  people: PropTypes.number.isRequired,
  setPeople: PropTypes.func.isRequired,
  maxPeople: PropTypes.number.isRequired,
  setMaxPeople: PropTypes.func.isRequired,
  peopleError: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};
