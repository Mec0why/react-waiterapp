import styles from './SingleTable.module.scss';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getTableById, editTable } from '../../../redux/tablesRedux';
import { getAllTableStatuses } from '../../../redux/tableStatusesRedux';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
  const [peopleError, setPeopleError] = useState(false);

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    if (people > maxPeople) {
      setPeopleError(true);
      console.log('Value Updated');
      setPeople(maxPeople);
    } else {
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
    }
  };

  if (!tableData) return <Navigate to='/' />;
  else
    return (
      <Container>
        <div className='d-flex justify-content-between'>
          <h1 className='m-0 align-self-center'>Table {tableData.id}</h1>
        </div>

        <Form onSubmit={validate(handleSubmit)} className='col-md-8 my-4'>
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
                {...register('people', {
                  required: true,
                  min: 0,
                  max: 10,
                })}
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
                {...register('maxPeople', {
                  required: true,
                  min: 0,
                  max: 10,
                })}
                type='text'
                value={maxPeople}
                placeholder='10'
                onChange={(e) => setMaxPeople(e.target.value)}
                className={styles.people}
              />
            </Col>
            {peopleError && !errors.people && !errors.maxPeople && (
              <small className='d-block form-text text-danger mt-2'>
                Value has been updated. <br />
                People amount cannot be lower than Max People amount.
              </small>
            )}
            {errors.people && (
              <small className='d-block form-text text-danger mt-2'>
                People amount cannot be lower than 0 and greater than 10.
              </small>
            )}
            {errors.maxPeople && (
              <small className='d-block form-text text-danger mt-2'>
                Max People amount cannot be greater than 10.
              </small>
            )}
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
