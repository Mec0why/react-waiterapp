import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllTableStatuses } from '../../../redux/tableStatusesRedux';
import { useForm } from 'react-hook-form';
import TableFormStatuses from '../../views/TableFormStatuses/TableFormStatuses';
import TableFormPeople from '../../views/TableFormPeople/TableFormPeople';
import TableFormBill from '../../views/TableFormBill/TableFormBill';

const TableForm = ({ action, actionText, ...props }) => {
  const [tableStatus, setTableStatus] = useState(props.status || '');
  const [people, setPeople] = useState(props.peopleAmount || '');
  const [maxPeople, setMaxPeople] = useState(props.maxPeopleAmount || '');
  const [bill, setBill] = useState(props.bill || '');
  const [peopleError, setPeopleError] = useState(false);
  const allTableStatuses = useSelector((state) => getAllTableStatuses(state));

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
      action({
        status: tableStatus,
        peopleAmount: people,
        maxPeopleAmount: maxPeople,
        bill: bill,
      });
    }
  };

  return (
    <Container>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0 align-self-center'>Table {props.id}</h1>
      </div>

      <Form onSubmit={validate(handleSubmit)} className='col-md-8 my-4'>
        <TableFormStatuses
          tableStatus={tableStatus}
          setTableStatus={setTableStatus}
          setBill={setBill}
          allTableStatuses={allTableStatuses}
          setPeople={setPeople}
        />

        <TableFormPeople
          register={register}
          people={people}
          setPeople={setPeople}
          maxPeople={maxPeople}
          setMaxPeople={setMaxPeople}
          peopleError={peopleError}
          errors={errors}
        />

        {tableStatus === 'Busy' && (
          <TableFormBill bill={bill} setBill={setBill} />
        )}

        <Button variant='primary' type='submit'>
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default TableForm;
