import React, { useState } from 'react';
import { SnackbarState } from 'components/common/CustomSnackbar';
import ReadRow from 'components/dishes/ReadRow';
import EditRow from 'components/dishes/EditedRow';

export type DishEvaluation = {
  id: number;
  name: string;
  ruby: string;
  ichito: number;
  mito: number;
};

type Props = {
  isEdit: boolean;
  row: DishEvaluation;
  handleRowClick: () => void;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
};

function HybridRow({ isEdit, row, handleRowClick, setSnackbarState }: Props) {
  const [evaluation, setEvaluation] = useState<DishEvaluation>(row);

  const handleRateChange = (key: 'ichito' | 'mito') => (rate: number) => () => {
    setEvaluation({ ...evaluation, [key]: rate });
  };

  const handleInputChange =
    (key: 'name' | 'ruby') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEvaluation({ ...evaluation, [key]: event.target.value });
    };

  const MemorizedReadRow = React.useMemo(() => {
    return <ReadRow key={evaluation.id} row={evaluation} handleRowClick={handleRowClick} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluation]);

  return isEdit ? (
    <EditRow
      row={evaluation}
      handleRateChange={handleRateChange}
      handleInputChange={handleInputChange}
      setSnackbarState={setSnackbarState}
    />
  ) : (
    MemorizedReadRow
  );
}

export default HybridRow;
