import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';

const Tables = () => {
  const tablesList = useSelector((state) => getAllTables(state));

  return (
    <Row className='justify-content-center'>
      <ListGroup className='my-4 p-0 col-md-8 align-self-center'>
        {tablesList.map((table) => (
          <ListGroup.Item
            key={table.id}
            className='py-4 d-flex align-items-center justify-content-between border-0 border-bottom'
          >
            <Col className='col-lg-2'>
              <h2 className='m-0'>Table {table.id}</h2>
            </Col>
            <Col>
              <h5 className='m-0 fw-bold'>
                Status: <span className='me-3 fw-normal'>{table.status}</span>
              </h5>
            </Col>
            <Col className='d-flex justify-content-end'>
              <Link to={`/table/${table.id}`}>
                <Button variant='primary'>Show more</Button>
              </Link>
            </Col>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Row>
  );
};

export default Tables;
