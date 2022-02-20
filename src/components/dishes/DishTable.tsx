import React, { useState } from 'react';
import { Table, TableContainer } from '@mui/material';
import SortTableHead, { sortState, HeadCell } from 'components/common/SortTableHead';
import SortTableBody, { stableSort, getComparator } from 'components/common/SortTableBody';
import HybridRow, { DishEvaluation } from 'components/dishes/HybridRow';

/// / メモ化しようとしたけど断念
// type Pro = {
//  rr: DishEvaluation;
//  isEdit: boolean;
//  rowClick: () => void;
// };

type Props = {
  evaluations: DishEvaluation[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DishTable({ evaluations }: Props) {
  console.log('DishTable描画');

  //  const Hoge = ({ rr, isEdit, rowClick }: Pro) =>
  //    useMemo(() => {
  //      return <HybridRow isEdit={isEdit} row={rr} handleRowClick={rowClick} />;
  //    }, [rr, isEdit, rowClick]);

  // 編集モードの行
  const [editRow, setEditRow] = useState(-1);
  const handleRowClick = (rowId: number) => () => setEditRow(rowId);
  //  const handleSaveClick = () => setEditRow(-1);

  // ソート状態
  const [sort, setSort] = useState<sortState>({
    order: 'asc',
    key: 'ruby',
  });

  const columns: HeadCell[] = [
    { id: 'save', label: '', width: 10 },
    { id: 'name', label: '料理名', width: 150 },
    { id: 'ruby', label: 'ふりがな', width: 150 },
    { id: 'ichito', label: 'いっちゃん', width: 100 },
    { id: 'mito', label: 'みーちゃん', width: 100 },
    { id: 'delete', label: '', width: 10 },
  ];

  // メモ化試行
  //  const wrapperRow = ({ row }: Pro) => {
  //    return (
  //      <HybridRow
  //        isEdit={row.id === editRow}
  //        row={row}
  //        handleRowClick={() => RowClick(row.id)}
  //      />
  //    );
  //  };
  //
  //  const MemoizedRow = React.memo(wrapperRow);

  return (
    <TableContainer sx={{ margin: (theme) => theme.spacing(2), width: '60rem' }}>
      <Table size="small">
        <SortTableHead state={sort} setState={setSort} columns={columns} />
        <SortTableBody>
          {stableSort<DishEvaluation>(evaluations, getComparator(sort.order, sort.key)).map(
            (row) => (
              <HybridRow
                isEdit={row.id === editRow}
                row={row}
                handleRowClick={handleRowClick(row.id)}
              />
            ),
          )}
        </SortTableBody>
      </Table>
    </TableContainer>
  );
}

export default DishTable;
