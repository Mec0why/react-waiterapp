import styles from './SingleTable.module.scss';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getTableById, editTable } from '../../../redux/tablesRedux';
import { getAllTableStatuses } from '../../../redux/tableStatusesRedux';
import { useNavigate, Navigate } from 'react-router-dom';

const SingleTable = () => {
  const { tableId } = useParams();
  const tableData = useSelector((state) => getTableById(state, tableId));
  const allTableStatuses = useSelector((state) => getAllTableStatuses(state));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tableStatus, setTableStatus] = useState(tableData.status || '');
  const [people, setPeople] = useState(tableData.peopleAmount || '');
  const [maxPeople, setMaxPeople] = useState(tableData.maxPeopleAmount || '');
  const [bill, setBill] = useState(tableData.bill || '');

  const handleSubmit = () => {
    dispatch(
      editTable({
        status: tableStatus,
        peopleAmount: people,
        maxPeopleAmount: maxPeople,
        bill: bill,
        id: tableId,
      })
    );
    console.log('I Submitted');
    navigate('/');
  };

  if (!tableData) return <Navigate to='/' />;
  else
    return (
      <Container>
        <div className='d-flex justify-content-between'>
          <h1 className='m-0 align-self-center'>Table {tableData.id}</h1>
        </div>

        <Form onSubmit={handleSubmit} className='col-md-8 my-4'>
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
                value={tableStatus}
                selected={tableStatus}
                onChange={(e) => setTableStatus(e.target.value)}
              >
                {allTableStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

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
                type='text'
                value={people}
                placeholder='0'
                onChange={(e) => setPeople(e.target.value)}
                className={styles.people}
              />
            </Col>
            <Col className='m-0 p-0 col-auto'>
              <Form.Text className='m-0'>/</Form.Text>
            </Col>
            <Col className='m-0 ps-2 col-auto'>
              <Form.Control
                type='text'
                value={maxPeople}
                placeholder='10'
                onChange={(e) => setMaxPeople(e.target.value)}
                className={styles.people}
              />
            </Col>
          </Form.Group>

          {tableData.status === 'Busy' && (
            <Form.Group
              as={Row}
              className='mb-4 align-items-center'
              controlId='formTableBill'
            >
              <Col className='m-0 col-sm-2 col-form-label'>
                <Form.Label className='m-0 fw-bold'>Bill:</Form.Label>
              </Col>
              <Col className='m-0 col-auto'>
                <Form.Text className='m-0 fs-6'>$</Form.Text>
              </Col>
              <Col className='m-0 col-auto'>
                <Form.Control
                  type='number'
                  value={bill}
                  placeholder='0'
                  onChange={(e) => setBill(e.target.value)}
                  className={styles.input}
                />
              </Col>
            </Form.Group>
          )}

          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      </Container>
    );
};

export default SingleTable;
