// customerActions.js

import axios from 'axios';

const addcustomerRequest = () => ({ type: 'ADD_DATA_REQUEST' });
const addcustomerSuccess = (message) => ({ type: 'ADD_DATA_SUCCESS', payload: message });
const addcustomerFailure = (error) => ({ type: 'ADD_DATA_FAILURE', payload: error });

export const addcustomer = (customer) => async (dispatch) => {
  dispatch(addcustomerRequest());
  try {
    const response = await axios.post('/api/add-customer', customer);
    if (response.status === 200) {
      dispatch(addcustomerSuccess(response.customer.message));
    } else {
      dispatch(addcustomerFailure('Error adding customer.'));
    }
  } catch (error) {
    dispatch(addcustomerFailure('Error adding customer.'));
  }
};
