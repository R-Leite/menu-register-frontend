import React, { useContext, useRef } from 'react';
// import { makeStyles } from '@mui/styles';
import { TextField, Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuContext } from 'components/menu-calendar/MenuCalendar';

// const useStyles = makeStyles({
//   calendar: {
//     width: '60rem',
//   },
// });

// 曜日に変換
const dayToJan: { [name: number]: string } = {
  0: '日',
  1: '月',
  2: '火',
  3: '水',
  4: '木',
  5: '金',
  6: '土',
};

// Dateを文字列に
export const formatDate = (date: Date, format: string) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = dayToJan[date.getDay()];

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('DD', dayOfWeek);
};

type Props = {
  date: Date;
  open: boolean;
  handleClose: () => void;
};

function MenuDialg({ date, open, handleClose }: Props) {
  console.log('ダイアログ描画');
  // コンテキスト
  const menus = useContext(MenuContext);

  const defaultMenu = menus.find((m) => m.date === formatDate(date, 'yyyy-MM-dd'))?.name ?? '';

  const inputRef = useRef<HTMLInputElement>();

  const dateString = formatDate(date, 'yyyy年MM月dd日（DD）');

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`${dateString} メニュー`}</DialogTitle>
      <TextField autoFocus defaultValue={defaultMenu} inputRef={inputRef} label="メニュー" />
      <Box>
        <Button color="primary" variant="contained" onClick={handleClose}>
          更新
        </Button>
        <Button color="primary" variant="contained" onClick={handleClose}>
          キャンセル
        </Button>
      </Box>
    </Dialog>
  );
}

export default MenuDialg;
