import PropTypes from 'prop-types';
import { updatePending } from './pendingRedux';

//selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tableId) =>
  tables.find((table) => table.id === tableId);

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

export const editTable = (payload) => ({ type: EDIT_TABLE, payload });

export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
  return (dispatch) => {
    dispatch(updatePending(true));

    fetch('http://localhost:3131/api/tables').then((res) => {
      if (res.status === 200) {
        res.json().then((tables) => dispatch(updateTables(tables)));
        dispatch(updatePending(false));
      }
    });
  };
};

export const editTableRequest = (table) => {
  return (dispatch) => {
    dispatch(updatePending(true));
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: table.status,
        peopleAmount: table.peopleAmount,
        maxPeopleAmount: table.maxPeopleAmount,
        bill: table.bill,
      }),
    };

    fetch(`http://localhost:3131/tables/${table.id}`, options).then(
      (response) => {
        if (response.status === 200) {
          console.log('The Response is: ' + response.status);
          response.json().then(() => dispatch(editTable(table)));
        }
      }
    );
  };
};

// action creators
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map((table) =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      );
    default:
      return statePart;
  }
};

export default tablesReducer;

editTableRequest.propTypes = {
  table: PropTypes.object.isRequired,
};
