import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import StarRating from 'components/common/StarRating';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertColor } from '@mui/material/Alert';
import { StyledTableCell } from 'components/atoms/StyledTableCell';
import { StyledTableRow } from 'components/atoms/StyledTableRow';
import ConfirmDialog from 'components/common/ConfirmDialog';
import CustomSnackbar from 'components/common/CustomSnackbar';
import { EvalChangeContext } from 'components/dishes/Dishes';
import { DishEvaluation } from 'components/dishes/HybridRow';

type Props = {
  notSave: boolean;
  row: DishEvaluation;
  handleRateChange: (key: 'ichito' | 'mito') => (rate: number) => () => void;
  handleInputChange: (
    key: 'name' | 'ruby',
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function EditedRow({ notSave, row, handleRateChange, handleInputChange }: Props) {
  console.log(`edit row ${row.id}描画`);

  // コンテキスト
  const changeContext = useContext(EvalChangeContext);

  // 確認ダイアログ
  const [dialogOpen, setDialogOpen] = useState(false);
  const deleteYes = () => {
    console.log(`${row.id}を削除!`);
  };

  const handleDeleteClick = () => setDialogOpen(true);

  // Snackbar
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleClose = () => setIsOpenSnackbar(false);

  const handleSaveClick = () => {
    setIsOpenSnackbar(true);
    setSnackbarStatus('success');
    setSnackbarMessage('保存しました');
  };

  return (
    <>
      <StyledTableRow key={row.id} data-id={row.id}>
        <StyledTableCell>
          <Button disabled={notSave} variant="outlined" onClick={handleSaveClick}>
            保存
          </Button>
        </StyledTableCell>
        <StyledTableCell>
          <TextField
            autoFocus
            defaultValue={row.name}
            value={row.name}
            onChange={(event) => {
              changeContext.handleInputChange(row.id)('name')(event);
              handleInputChange('name')(event);
            }}
          />
        </StyledTableCell>
        <StyledTableCell>
          <TextField
            defaultValue={row.ruby}
            onChange={(event) => {
              changeContext.handleInputChange(row.id)('ruby')(event);
              handleInputChange('ruby')(event);
            }}
          />
        </StyledTableCell>
        <StyledTableCell>
          <StarRating
            maxLevel={3}
            level={row.ichito}
            handleRateChange={(rate) => () => {
              handleRateChange('ichito')(rate)();
              changeContext.handleRateChange(row.id)('ichito')(rate);
            }}
          />
        </StyledTableCell>
        <StyledTableCell>
          <StarRating
            maxLevel={3}
            level={row.mito}
            handleRateChange={(rate) => () => {
              handleRateChange('mito')(rate)();
              changeContext.handleRateChange(row.id)('mito')(rate);
            }}
          />
        </StyledTableCell>
        <StyledTableCell>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <CustomSnackbar
        isOpen={isOpenSnackbar}
        status={snackbarStatus}
        message={snackbarMessage}
        handleClose={handleClose}
      />
      <ConfirmDialog
        message="削除しますか？"
        isOpen={dialogOpen}
        doYes={deleteYes}
        doNo={() => setDialogOpen(false)}
      />
    </>
  );
}

export default EditedRow;
