/* eslint-disable react/require-default-props */
import React from 'react';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type SnackbarState = {
  isOpen: boolean;
  message: string;
  status: AlertColor;
};

type Props = {
  state: SnackbarState;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right' | 'center';
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
};

export default function CustomSnackbar({
  state,
  vertical = 'bottom',
  horizontal = 'center',
  setSnackbarState,
}: Props) {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarState({
      ...state,
      isOpen: false,
    });
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={state.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      action={action}
    >
      <Alert onClose={handleClose} severity={state.status}>
        {state.message}
      </Alert>
    </Snackbar>
  );
}
