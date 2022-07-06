import React, { ReactNode } from 'react';
import { Button, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type Props = {
  message: ReactNode;
  isOpen: boolean;
  doYes: () => void;
  doNo: () => void;
};

function ConfirmDialog({ message, isOpen, doYes, doNo }: Props) {
  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={doNo}
      aria-labelledby="common-dialg-title"
      aria-describedby="common-dialog-description"
    >
      <DialogContent>{message}</DialogContent>
      <DialogActions sx={{ justifyContent: 'space-evenly' }}>
        <Button
          onClick={() => {
            doYes();
            doNo();
          }}
          color="primary"
        >
          はい
        </Button>
        <Button onClick={doNo} color="primary">
          いいえ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
