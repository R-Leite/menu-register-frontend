import React, { useState, useEffect } from 'react';
import ReadRow from 'components/dishes/ReadRow';
import EditRow from 'components/dishes/EditedRow';

export type DishEvaluation = {
  id: number;
  name: string;
  ruby: string;
  ichito: number;
  mito: number;
};

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

const defaultEval: DishEvaluation = {
  id: -1,
  name: '',
  ruby: '',
  ichito: 0,
  mito: 0,
};

type Props = {
  isEdit: boolean;
  row: DishEvaluation;
  handleRowClick: () => void;
  //  handleSaveClick: () => void;
};

function HybridRow({ isEdit, row, handleRowClick }: Props) {
  const [initEval, setInitEval] = useState<DishEvaluation>(defaultEval);

  useEffect(() => {
    const e = data.find((x) => x.id === row.id) ?? defaultEval;
    setInitEval(e);
  }, [row]);

  const [evaluation, setEvaluation] = useState<DishEvaluation>(row);

  const handleRateChange = (key: 'ichito' | 'mito') => (rate: number) => () => {
    setEvaluation({ ...evaluation, [key]: rate });
  };

  const handleInputChange =
    (key: 'name' | 'ruby') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEvaluation({ ...evaluation, [key]: event.target.value });
    };

  //  const MemoRow = React.memo(() => {
  //    return isEdit ? (
  //      <EditRow
  //        row={evaluation}
  //        handleRateChange={handleRateChange}
  //        handleInputChange={handleInputChange}
  //      />
  //    ) : (
  //      <ReadRow row={evaluation} handleRowClick={handleRowClick} />
  //    );
  //  });

  return isEdit ? (
    <EditRow
      notSave={JSON.stringify(initEval) === JSON.stringify(evaluation)}
      row={evaluation}
      handleRateChange={handleRateChange}
      handleInputChange={handleInputChange}
    />
  ) : (
    <ReadRow row={evaluation} handleRowClick={handleRowClick} />
  );
}

export default HybridRow;
