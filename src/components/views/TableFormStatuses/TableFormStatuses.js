import { Row, Col, Form } from 'react-bootstrap';

const TableFormStatuses = (props) => {
  return (
    <Form.Group
      as={Row}
      className='mb-4 align-items-center'
      controlId='formTableStatus'
    >
      <Col className='m-0 col-sm-2 col-form-label'>
        <Form.Label className='m-0 fw-bold'>Status:</Form.Label>
      </Col>
      <Col className='m-0 col-sm-5'>
        <Form.Select
          value={props.tableStatus}
          selected={props.tableStatus}
          onChange={(e) => {
            props.setTableStatus(e.target.value);
            props.setBill('0');
            if (e.target.value === 'Cleaning' || e.target.value === 'Free') {
              props.setPeople('0');
            }
          }}
        >
          {props.allTableStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Form.Group>
  );
};

export default TableFormStatuses;
