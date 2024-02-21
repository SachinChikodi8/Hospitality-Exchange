import { Box, CircularProgress, Fab } from '@mui/material';
import { useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { getUsers, updateStatus } from '../../../actions/user';
import { useValue } from '../../../context/ContextProvider';

const UsersActions = ({ params, rowId, setRowId }) => {
  const {
    dispatch,
    state: { currentUser},
  } = useValue();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const { role, active, _id } = params.row;
    const result = await updateStatus(
      { role, active },
      _id,
      dispatch,
      currentUser
    );
    if (result) {
      setSuccess(true);
      setRowId(null);
      getUsers(dispatch, currentUser);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UsersActions;
