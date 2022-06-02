import { Row, ListGroup, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import { capFirstLetter } from '../../../utils/capFirstLetter';

const Tables = () => {
  const tablesList = useSelector((state) => getAllTables(state));

  //   if (!tablesList) return <Navigate to='/' />;
  return (
    <Row className='justify-content-center'>
      <ListGroup className='my-4 p-0 col-md-8 align-self-center'>
        {tablesList.map((table) => (
          <ListGroup.Item
            key={table.id}
            className='py-4 d-flex justify-content-between border-0 border-bottom'
          >
            <h2 className='m-0'>Table {table.id}</h2>
            <Link to={`/table/${table.id}`}>
              <Button variant='primary'>Read more</Button>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Row>
  );
};

export default Tables;
