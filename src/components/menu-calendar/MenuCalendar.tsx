/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect, createContext } from 'react';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DateRangeIcon from '@mui/icons-material/DateRange';
import axios, { AxiosResponse } from 'axios';
import { API_ROOT } from 'SystemConstants';
import { formatDate } from 'Utils';
import Header from 'components/header/Header';
import PageTitle from 'components/common/PageTitle';
import MenuDialog from 'components/menu-calendar/MenuDialog';
import { DishEvaluation } from 'components/dishes/HybridRow';

const useStyles = makeStyles({
  calendar: {
    width: '60rem',
  },
});

export type Menu = {
  id: number;
  date: string;
  dish: DishEvaluation;
};

export const MenuContext = createContext(
  {} as {
    menus: Menu[];
    fetchMenu: () => void;
  },
);

function MenuCalendar() {
  const classes = useStyles();

  // メニュー
  const [menus, setMenus] = useState<Menu[]>([]);

  // ダイアログ
  const [dialogOpen, setDialogOpen] = useState(false);

  // 選択日付
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const fetch = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const url = `${API_ROOT}/menus?year=${year}&month=${month}`;
    void axios.get(url).then((res: AxiosResponse<Menu[]>) => setMenus(res.data));
  };

  useEffect(() => {
    void fetch(new Date());
  }, []);

  // 各メニュー名表示
  const tileContent = (tileProperties: CalendarTileProperties) => {
    const dateString = formatDate(tileProperties.date, 'yyyy-MM-dd');
    const content = menus.find((m) => m.date === dateString)?.dish?.name ?? '';

    return <div>{content}</div>;
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MenuContext.Provider value={{ menus, fetchMenu: () => fetch(selectedDate) }}>
      <Header />
      <PageTitle label="献立" icon={<DateRangeIcon fontSize="large" />} />
      <Box sx={{ marginLeft: (theme) => theme.spacing(2) }}>
        <Calendar
          calendarType="US"
          className={classes.calendar}
          formatDay={(locale, d) => d.getDate().toString()}
          locale="ja-JP"
          onChange={handleDateChange}
          onActiveStartDateChange={({ activeStartDate }) => fetch(activeStartDate)}
          tileContent={tileContent}
          value={selectedDate}
        />
      </Box>
      <MenuDialog date={selectedDate} open={dialogOpen} handleClose={() => setDialogOpen(false)} />
    </MenuContext.Provider>
  );
}

export default MenuCalendar;
