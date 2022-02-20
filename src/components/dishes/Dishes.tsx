/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, useMemo } from 'react';
import Header from 'components/header/Header';
import PageTitle from 'components/common/PageTitle';
import DishHeader from 'components/dishes/DishHeader';
import DishTable from 'components/dishes/DishTable';
import { DishEvaluation } from 'components/dishes/HybridRow';

const data: DishEvaluation[] = [
  { id: 0, name: 'カレー', ruby: 'かれー', ichito: 3, mito: 2 },
  { id: 1, name: 'うどん', ruby: 'うどん', ichito: 2, mito: 1 },
  { id: 2, name: 'ヒレカツ', ruby: 'ひれかつ', ichito: 1, mito: 3 },
  { id: 3, name: '鍋', ruby: 'なべ', ichito: 1, mito: 2 },
  { id: 4, name: 'オムハヤシ', ruby: 'おむはやし', ichito: 2, mito: 2 },
  { id: 5, name: '豚の角煮', ruby: 'ぶたのかくに', ichito: 3, mito: 1 },
  { id: 6, name: '小籠包', ruby: 'しょうろんぽう', ichito: 1, mito: 1 },
  { id: 7, name: '餃子', ruby: 'ぎょうざ', ichito: 2, mito: 3 },
];

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

function Dishes() {
  console.log('Dishes描画');

  // ヘッダー用評価
  const [headerEvals, setHeaderEvals] = useState<DishEvaluation[]>([]);
  const handleInputChange =
    (rowId: number) =>
    (key: 'name' | 'ruby') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const index = headerEvals.find((x) => x.id === rowId)?.id ?? 0;
      const newEval = headerEvals.slice();
      newEval[index] = Object.assign(headerEvals[index], { [key]: e.target.value });
      setHeaderEvals(newEval);
    };

  const handleRateChange = (rowId: number) => (key: 'ichito' | 'mito') => (rate: number) => {
    const index = headerEvals.find((x) => x.id === rowId)?.id ?? 0;
    const newEval = headerEvals.slice();
    newEval[index] = Object.assign(headerEvals[index], { [key]: rate });
    setHeaderEvals(newEval);
  };

  // テーブル初期表示用
  const [evaluations, setEvaluations] = useState<DishEvaluation[]>([]);

  useEffect(() => {
    setEvaluations(data);
    setHeaderEvals(data);
  }, []);

  const memoTable = useMemo(() => {
    return <DishTable evaluations={evaluations} />;
  }, [evaluations]);

  return (
    <>
      <Header />
      <PageTitle label="料理一覧" />
      <DishHeader evaluations={headerEvals} />
      <EvalChangeContext.Provider value={{ handleInputChange, handleRateChange }}>
        {memoTable}
      </EvalChangeContext.Provider>
    </>
  );
}

export default Dishes;
