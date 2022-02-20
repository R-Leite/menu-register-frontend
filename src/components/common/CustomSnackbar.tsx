/* eslint-disable react/require-default-props */
import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  isOpen: boolean;
  message: string;
  status: AlertColor;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right' | 'center';
  handleClose: () => void;
};

export default function CustomSnackbar({
  isOpen,
  message,
  status,
  vertical = 'bottom',
  horizontal = 'center',
  handleClose,
}: Props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
}
