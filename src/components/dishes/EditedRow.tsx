import React, { ReactNode, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import StarRating from 'components/common/StarRating';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios, { AxiosResponse } from 'axios';
import { API_ROOT } from 'SystemConstants';
import { StyledTableCell } from 'components/atoms/StyledTableCell';
import { StyledTableRow } from 'components/atoms/StyledTableRow';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { SnackbarState } from 'components/common/CustomSnackbar';
import { Menu } from 'components/menu-calendar/MenuCalendar';
import { EvalChangeContext, DishContext } from 'components/dishes/Dishes';
import { DishEvaluation } from 'components/dishes/HybridRow';

type Props = {
  row: DishEvaluation;
  handleRateChange: (key: 'ichito' | 'mito') => (rate: number) => () => void;
  handleInputChange: (
    key: 'name' | 'ruby',
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
};

function EditedRow({ row, handleRateChange, handleInputChange, setSnackbarState }: Props) {
  // コンテキスト
  const changeContext = useContext(EvalChangeContext);
  const { dishes, fetch } = useContext(DishContext);

  // 確認ダイアログ
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<ReactNode>();

  // 保存押下
  const handleSaveClick = () => {
    const url = `${API_ROOT}/dishes/${row.id}/`;
    const requestJson = {
      dish_type: 1,
      ruby: row.ruby,
      name: row.name,
      ichito: row.ichito,
      mito: row.mito,
    };

    void axios
      .put(url, requestJson)
      .then((_) =>
        setSnackbarState({
          isOpen: true,
          message: '保存しました。',
          status: 'success',
        }),
      )
      .catch((_) =>
        setSnackbarState({
          isOpen: true,
          message: '保存に失敗しました。',
          status: 'error',
        }),
      );
  };

  // 削除押下
  const handleDeleteClick = async () => {
    const url = `${API_ROOT}/menus/?dish=${row.id}`;
    const deleteMenus: AxiosResponse<Menu[]> = await axios.get(url);
    const msg = (
      <>
        下記の日付に登録されていますが、削除しますか？
        {deleteMenus.data
          .map((x) => x.date)
          .map((x) => (
            <div>・{x}</div>
          ))}
      </>
    );
    setDialogMessage(msg);
    setDialogOpen(true);
  };

  const deleteYes = () => {
    const url = `${API_ROOT}/dishes/${row.id}/`;
    void axios
      .delete(url)
      .then((_) =>
        setSnackbarState({
          isOpen: true,
          message: `${row.name}を削除しました。`,
          status: 'success',
        }),
      )
      .catch((_) =>
        setSnackbarState({
          isOpen: true,
          message: `${row.name}の削除に失敗しました。`,
          status: 'error',
        }),
      )
      .finally(() => {
        setDialogOpen(false);
        fetch();
      });
  };

  const nameError = dishes.filter((d) => d.id !== row.id).some((d) => d.name === row.name);
  const nameHelper = nameError ? '既に同じ名前が存在します。' : '';
  const rubyError = dishes.filter((d) => d.id !== row.id).some((d) => d.ruby === row.ruby);
  const rubyHelper = rubyError ? '既に同じふりがなが存在します。' : '';

  return (
    <>
      <StyledTableRow key={row.id} data-id={row.id}>
        <StyledTableCell>
          <Button disabled={nameError || rubyError} variant="contained" onClick={handleSaveClick}>
            保存
          </Button>
        </StyledTableCell>
        <StyledTableCell>
          <TextField
            autoFocus
            error={nameError}
            helperText={nameHelper}
            value={row.name}
            size="small"
            onChange={(e) => {
              handleInputChange('name')(e);
              changeContext.handleInputChange(row.id)('name')(e);
            }}
          />
        </StyledTableCell>
        <StyledTableCell>
          <TextField
            error={rubyError}
            helperText={rubyHelper}
            value={row.ruby}
            size="small"
            onChange={(e) => {
              handleInputChange('ruby')(e);
              changeContext.handleInputChange(row.id)('ruby')(e);
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
            <DeleteIcon color="error" />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <ConfirmDialog
        message={dialogMessage}
        isOpen={dialogOpen}
        doYes={deleteYes}
        doNo={() => setDialogOpen(false)}
      />
    </>
  );
}

export default EditedRow;
