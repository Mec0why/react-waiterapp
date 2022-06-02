//selectors
export const getAllTableStatuses = (state) => state.tableStatuses;

// actions
const createActionName = (actionName) => `app/tableStatuses/${actionName}`;
const UPDATE_TABLE_STATUSES = createActionName('UPDATE_TABLE_STATUSES');

// action creators
export const updateTableStatuses = (payload) => ({
  type: UPDATE_TABLE_STATUSES,
  payload,
});
export const fetchStatuses = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tableStatuses')
      .then((res) => res.json())
      .then((tableStatuses) => dispatch(updateTableStatuses(tableStatuses)));
  };
};

const tableStatusesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLE_STATUSES:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default tableStatusesReducer;
