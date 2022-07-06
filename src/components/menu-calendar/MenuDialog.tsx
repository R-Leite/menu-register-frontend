/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
// import { makeStyles } from '@mui/styles';
import { TextField, Box, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import axios, { AxiosResponse } from 'axios';
import { API_ROOT } from 'SystemConstants';
import { dayToJan, formatDate } from 'Utils';
import StarRating from 'components/common/StarRating';
import CustomSnackbar, { SnackbarState } from 'components/common/CustomSnackbar';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { MenuContext, Menu } from 'components/menu-calendar/MenuCalendar';
import { DishEvaluation } from 'components/dishes/HybridRow';

type Props = {
  date: Date;
  open: boolean;
  handleClose: () => void;
};

function MenuDialg({ date, open, handleClose }: Props) {
  // コンテキスト
  const { menus, fetchMenu } = useContext(MenuContext);

  const [menu, setMenu] = useState<Menu>();
  const [ruby, setRuby] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [rate, setRate] = useState({
    ichito: 1,
    mito: 1,
  });
  const [dishes, setDishes] = useState<DishEvaluation[]>([]);

  useEffect(() => {
    const defaultMenu = menus.find((m) => m.date === formatDate(date, 'yyyy-MM-dd'));
    setMenu(defaultMenu);
    setRuby(defaultMenu?.dish.ruby ?? '');
    setName(defaultMenu?.dish.name ?? '');
    setRate({
      ichito: defaultMenu?.dish.ichito ?? 1,
      mito: defaultMenu?.dish.mito ?? 1,
    });
    const dishUrl = `${API_ROOT}/dishes`;
    void axios.get(dishUrl).then((res: AxiosResponse<DishEvaluation[]>) => setDishes(res.data));
  }, [date, menus]);

  useEffect(() => {
    const selectedDish = dishes.find((dish) => dish.ruby === ruby || dish.name === name);
    setRate({
      ichito: selectedDish?.ichito ?? 1,
      mito: selectedDish?.mito ?? 1,
    });
  }, [ruby, name, dishes]);

  const dateString = formatDate(date, 'yyyy年MM月dd日(DD)');

  const handleRubyChange = (e: any, v: string | null) => {
    setName(dishes.find((dish) => dish.ruby === v)?.name ?? name);
    setRuby(v ?? '');
  };

  const handleNameChange = (e: any, v: string | null) => {
    setName(v ?? '');
    setRuby(dishes.find((dish) => dish.name === v)?.ruby ?? ruby);
  };

  const handleRateChange = (key: 'ichito' | 'mito') => (newRate: number) => {
    setRate({
      ...rate,
      [key]: newRate,
    });
  };

  // snackbar
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    isOpen: false,
    message: '',
    status: 'error',
  });

  // confirm
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  // dishを登録したあとdish id を取得し、menuに登録する
  const handleUpdateButtonClick = async () => {
    let dishId = dishes.find((dish) => dish.ruby === ruby)?.id;
    // dishを新規登録
    if (dishId === undefined) {
      const url = `${API_ROOT}/dishes/`;
      const requestJson = {
        dish_type: 1,
        ruby,
        name,
        ichito: rate.ichito,
        mito: rate.mito,
      };
      const dish: AxiosResponse<DishEvaluation> = await axios.post(url, requestJson);
      dishId = dish.data.id;
    } else {
      const url = `${API_ROOT}/dishes/${dishId}/`;
      const requestJson = {
        dish_type: 1,
        ruby,
        name,
        ichito: rate.ichito,
        mito: rate.mito,
      };

      void axios
        .put(url, requestJson)
        .then((_) =>
          setSnackbarState({
            isOpen: true,
            message: 'メニューを更新しました。',
            status: 'success',
          }),
        )
        .catch((_) =>
          setSnackbarState({
            isOpen: true,
            message: 'メニューの更新に失敗しました。',
            status: 'error',
          }),
        );
    }

    // メニュー用リクエストjson
    const dateStr = formatDate(date, 'yyyy-MM-dd');
    const requestJson = {
      date: dateStr,
      dish: dishId,
    };

    // メニューを新規登録
    if (menu === undefined) {
      const url = `${API_ROOT}/menu-register/`;
      void axios
        .post(url, requestJson)
        .then((_) => {
          setSnackbarState({
            isOpen: true,
            message: '登録しました。',
            status: 'success',
          });
          fetchMenu();
        })
        .finally(() => handleClose());
    } else {
      // メニューを更新
      const url = `${API_ROOT}/menu-register/${menu.id}/`;
      void axios
        .put(url, requestJson)
        .then((_) => {
          setSnackbarState({
            isOpen: true,
            message: '更新しました。',
            status: 'success',
          });
          fetchMenu();
        })
        .finally(() => handleClose());
    }
  };

  const deleteMenu = () => {
    if (menu !== undefined) {
      const url = `${API_ROOT}/menu-register/${menu.id}/`;
      void axios
        .delete(url)
        .then((_) => {
          setSnackbarState({
            isOpen: true,
            message: '削除しました。',
            status: 'success',
          });
          fetchMenu();
        })
        .finally(() => handleClose());
    }
  };

  return (
    <>
      <Dialog keepMounted open={open} onClose={handleClose}>
        <DialogTitle>{`${dateString} メニュー`}</DialogTitle>
        <Autocomplete
          freeSolo
          options={dishes.map((d) => d.ruby)}
          onInputChange={handleRubyChange}
          renderInput={(params) => <TextField autoFocus {...params} label="ふりがな" />}
          value={ruby}
          sx={{ m: (theme) => theme.spacing(1, 2) }}
        />
        <Autocomplete
          freeSolo
          options={dishes.map((d) => d.name)}
          onInputChange={handleNameChange}
          renderInput={(params) => <TextField {...params} label="料理名" />}
          value={name}
          sx={{ m: (theme) => theme.spacing(1, 2) }}
        />
        <Box mx={2}>
          いちと:
          <StarRating
            maxLevel={3}
            level={rate.ichito}
            handleRateChange={(r) => () => handleRateChange('ichito')(r)}
          />
        </Box>
        <Box mx={2}>
          みと:
          <StarRating
            maxLevel={3}
            level={rate.mito}
            handleRateChange={(r) => () => handleRateChange('mito')(r)}
          />
        </Box>
        {/*
      <Box>
        <Select MenuProps={{ sx: { maxHeight: 300 } }} labelId="select_holiday" id="select_holiday">
          {[...Array(24).keys()].map((x) => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
        :
        <Select
          MenuProps={{ sx: { maxHeight: 300 } }}
          labelId="select_holiday"
          id="select_holiday"
          displayEmpty
        >
          {[...Array(60).keys()].map((x) => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </Box>
 */}
        <Box sx={{ display: 'flex', m: (theme) => theme.spacing(2) }}>
          <Button
            color="primary"
            disabled={ruby.length <= 0 || name.length <= 0}
            variant="contained"
            onClick={handleUpdateButtonClick}
          >
            更新
          </Button>
          <Box component="span" sx={{ mx: (theme) => theme.spacing(2) }}>
            <Button
              color="error"
              disabled={menu === undefined}
              variant="contained"
              onClick={() => setOpenConfirm(true)}
            >
              削除
            </Button>
          </Box>
          <Box component="span" sx={{ marginLeft: 'auto' }}>
            <Button color="primary" variant="outlined" onClick={handleClose}>
              キャンセル
            </Button>
          </Box>
        </Box>
      </Dialog>
      <CustomSnackbar state={snackbarState} setSnackbarState={setSnackbarState} />
      <ConfirmDialog
        isOpen={openConfirm}
        doYes={deleteMenu}
        doNo={() => setOpenConfirm(false)}
        message="削除しますか?"
      />
    </>
  );
}

export default MenuDialg;
