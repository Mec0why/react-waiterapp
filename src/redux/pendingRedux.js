//selectors
export const getPending = (state) => state.pending;

// actions
const createActionName = (actionName) => `app/pending/${actionName}`;
const UPDATE_PENDING = createActionName('UPDATE_PENDING');

export const updatePending = (payload) => ({ type: UPDATE_PENDING, payload });

// action creators
const pendingReducer = (statePart = Boolean, action) => {
  switch (action.type) {
    case UPDATE_PENDING:
      return action.payload;
    default:
      return statePart;
  }
};

export default pendingReducer;
