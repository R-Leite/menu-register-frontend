/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, useMemo } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import axios, { AxiosResponse } from 'axios';
import { API_ROOT } from 'SystemConstants';
import Header from 'components/header/Header';
import PageTitle from 'components/common/PageTitle';
import DishHeader from 'components/dishes/DishHeader';
import DishTable from 'components/dishes/DishTable';
import { DishEvaluation } from 'components/dishes/HybridRow';

export const EvalChangeContext = createContext(
  {} as {
    handleInputChange: (
      rowId: number,
    ) => (
      key: 'name' | 'ruby',
    ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleRateChange: (rowId: number) => (key: 'ichito' | 'mito') => (rate: number) => void;
  },
);

export const DishContext = createContext<{
  dishes: DishEvaluation[];
  fetch: () => void;
}>({ dishes: [], fetch: () => undefined });

function Dishes() {
  // ヘッダー評価用
  const [headerEvals, setHeaderEvals] = useState<DishEvaluation[]>([]);
  const handleInputChange =
    (rowId: number) =>
    (key: 'name' | 'ruby') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const index = headerEvals.findIndex((x) => x.id === rowId);
      const newEval = headerEvals.slice();
      newEval[index] = Object.assign(headerEvals[index], { [key]: e.target.value });
      setHeaderEvals(newEval);
    };

  const handleRateChange = (rowId: number) => (key: 'ichito' | 'mito') => (rate: number) => {
    const index = headerEvals.findIndex((x) => x.id === rowId);
    const newEval = headerEvals.slice();
    newEval[index] = Object.assign(headerEvals[index], { [key]: rate });
    setHeaderEvals(newEval);
  };

  // テーブル初期表示用
  const [evaluations, setEvaluations] = useState<DishEvaluation[]>([]);

  const fetch = () => {
    const url = `${API_ROOT}/dishes`;
    void axios.get(url).then((res: AxiosResponse<DishEvaluation[]>) => {
      setEvaluations(res.data);
      setHeaderEvals(res.data);
    });
  };

  useEffect(() => {
    void fetch();
  }, []);

  const MemorizedTable = useMemo(() => {
    return <DishTable evaluations={evaluations} />;
  }, [evaluations]);

  return (
    <>
      <Header />
      <PageTitle label="料理一覧" icon={<FormatListBulletedIcon fontSize="large" />} />
      <DishHeader evaluations={headerEvals} />
      <EvalChangeContext.Provider value={{ handleInputChange, handleRateChange }}>
        <DishContext.Provider value={{ dishes: evaluations, fetch }}>
          {MemorizedTable}
        </DishContext.Provider>
      </EvalChangeContext.Provider>
    </>
  );
}

export default Dishes;
