const initialState = {
  tables: [
    {
      id: '1',
      status: 'Free',
      guestNumAct: '1',
      guestNumMax: '2',
      bill: '22',
    },
    {
      id: '2',
      status: 'Busy',
      guestNumAct: '2',
      guestNumMax: '4',
      bill: '48',
    },
    {
      id: '3',
      status: 'Cleaning',
      guestNumAct: '0',
      guestNumMax: '5',
      bill: '0',
    },
    {
      id: '4',
      status: 'Reserved',
      guestNumAct: '0',
      guestNumMax: '2',
      bill: '0',
    },
  ],
  tableStatuses: ['Free', 'Reserved', 'Busy', 'Cleaning'],
};

export default initialState;
