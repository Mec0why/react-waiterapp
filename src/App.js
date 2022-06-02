import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTables } from './redux/tablesRedux';
import { fetchStatuses } from './redux/tableStatusesRedux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatuses()), [dispatch]);

  return <div className='App'>Hello World!</div>;
}

export default App;
