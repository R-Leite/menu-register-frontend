import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Table, TableContainer } from '@mui/material';
import SortTableHead, { sortState, HeadCell } from 'components/common/SortTableHead';
import SortTableBody, { stableSort, getComparator } from 'components/common/SortTableBody';
import CustomSnackbar, { SnackbarState } from 'components/common/CustomSnackbar';
import HybridRow, { DishEvaluation } from 'components/dishes/HybridRow';

type Props = {
  evaluations: DishEvaluation[];
};

function DishTable({ evaluations }: Props) {
  // 編集モードの行
  const [editRow, setEditRow] = useState<number>(-1);
  const handleRowClick = (rowId: number) => () => setEditRow(rowId);

  // Snackbar
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    isOpen: false,
    message: '',
    status: 'error',
  });

  // ソート状態
  const [sort, setSort] = useState<sortState>({
    order: 'asc',
    key: 'ruby',
  });

  const columns: HeadCell[] = [
    { id: 'save', label: '', width: 10 },
    { id: 'name', label: '料理名', width: 200 },
    { id: 'ruby', label: 'ふりがな', width: 200 },
    { id: 'ichito', label: 'いっちゃん', width: 100 },
    { id: 'mito', label: 'みーちゃん', width: 100 },
    { id: 'delete', label: '', width: 10 },
  ];

  return (
    <>
      <Paper sx={{ m: (theme) => theme.spacing(2), width: '60rem' }}>
        <TableContainer sx={{ overflow: 'visible' }}>
          <Table stickyHeader size="small">
            <SortTableHead state={sort} setState={setSort} columns={columns} />
            <SortTableBody>
              {stableSort<DishEvaluation>(evaluations, getComparator(sort.order, sort.key)).map(
                (row) => (
                  <HybridRow
                    key={row.id}
                    isEdit={row.id === editRow}
                    row={row}
                    handleRowClick={handleRowClick(row.id)}
                    setSnackbarState={setSnackbarState}
                  />
                ),
              )}
            </SortTableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CustomSnackbar state={snackbarState} setSnackbarState={setSnackbarState} />
    </>
  );
}

export default DishTable;
