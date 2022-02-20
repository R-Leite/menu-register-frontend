import React, { useState, useEffect, createContext } from 'react';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from 'components/header/Header';
import PageTitle from 'components/common/PageTitle';
import MenuDialog, { formatDate } from 'components/menu-calendar/MenuDialog';

const useStyles = makeStyles({
  calendar: {
    width: '60rem',
  },
});

type Menu = {
  id: number;
  date: string;
  name: string;
};

const examples: Menu[] = [
  { id: 1, date: '2022-01-01', name: 'カレーライス' },
  { id: 2, date: '2022-01-02', name: '鍋' },
];

export const MenuContext = createContext<Menu[]>([]);

function MenuCalendar() {
  const classes = useStyles();

  // メニュー
  const [menus, setMenus] = useState<Menu[]>([]);

  // ダイアログ
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };

  // 選択日付
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  useEffect(() => {
    setMenus(examples);
  }, []);

  // 各メニュー名表示
  const tileContent = (tileProperties: CalendarTileProperties) => {
    const dateString = formatDate(tileProperties.date, 'yyyy-MM-dd');
    const content = menus.find((m) => m.date === dateString)?.name ?? '';

    return <div>{content}</div>;
  };

  return (
    <MenuContext.Provider value={menus}>
      <Header />
      <PageTitle label="献立" />
      <Box sx={{ marginLeft: (theme) => theme.spacing(2) }}>
        <Calendar
          calendarType="US"
          className={classes.calendar}
          formatDay={(locale, d) => d.getDate().toString()}
          locale="ja-JP"
          onChange={handleDateChange}
          tileContent={tileContent}
          value={selectedDate}
        />
      </Box>
      <MenuDialog date={selectedDate} open={dialogOpen} handleClose={handleClose} />
    </MenuContext.Provider>
  );
}

export default MenuCalendar;
