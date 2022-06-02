import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { getAllTableStatuses } from '../../../redux/tableStatusesRedux';
import { Navigate } from 'react-router-dom';

const SingleTable = () => {
  const { tableId } = useParams();
  const tableData = useSelector((state) => getTableById(state, tableId));
  const allTableStatuses = useSelector((state) => getAllTableStatuses(state));

  const [tableStatus, setTableStatus] = useState(tableData.status || '');
  const [bill, setBill] = useState(tableData.bill || '');

  const handleSubmit = () => {
    console.log('I Submitted');
  };

  if (!tableData) return <Navigate to='/' />;
  else
    return (
      <Container>
        <div className='d-flex justify-content-between'>
          <h1 className='m-0 align-self-center'>Table {tableData.id}</h1>
        </div>
        <Form onSubmit={handleSubmit} className='col-md-8 my-4'>
          <Row>
            <Form.Group className='mb-4' controlId='formPostCategory'>
              <Col>
                <Form.Label>Status: </Form.Label>
              </Col>
              <Col md={2}>
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
          </Row>

          <Form.Group className='mb-4 col-sm-2' controlId='formTableBill'>
            <Form.Label>Bill</Form.Label>
            <Form.Control
              type='number'
              value={bill}
              placeholder='$'
              onChange={(e) => setBill(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Container>
    );
};

export default SingleTable;
