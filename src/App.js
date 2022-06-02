import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTables } from './redux/tablesRedux';
import { fetchStatuses } from './redux/tableStatusesRedux';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/Home/Home';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import NotFound from './components/views/NotFound/NotFound';
import SingleTable from './components/features/SingleTable/SingleTable';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatuses()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/table/:tableId' element={<SingleTable />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
