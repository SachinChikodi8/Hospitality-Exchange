import fetchData from './utils/fetchData';
import axios from 'axios';


const url = 'http://localhost:5000/Customer'; 
const registercustomer = async (userData) => {
  try {
    // Use the 'url' variable directly
    const response = await axios.post(url, userData);

    // Assuming your backend returns an object with a 'success' property
    return response.data;
  } catch (error) {
    console.error('Error during customer registration:', error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export { registercustomer };


export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const { name } = updatedFields;
//   const { name, file } = updatedFields;
  let body = { name };
  try {
    const result = await fetchData(
      {
        url: url + '/registercustomer',
        method: 'PATCH',
        body,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({ type: 'UPDATE_CUSTOMER', payload: { ...currentUser, ...result } });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Your profile has been updated successfully',
        },
      });
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { },
      });
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: 'END_LOADING' });
};

export const getCustomer = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url, method: 'GET' },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_CUSTOMERS', payload: result });
  }
};


export const logout = (dispatch) => {
  dispatch({ type: 'UPDATE_CUSTOMER', payload: null });
  dispatch({ type: 'RESET_ROOM' });
};
