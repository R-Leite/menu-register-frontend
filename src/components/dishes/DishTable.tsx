import React, { useState, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { Table, TableContainer } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

  // 検索文字列
  const [searchWord, setSearchWord] = useState<string>('');

  const columns: HeadCell[] = [
    { id: 'save', label: '', width: 10 },
    { id: 'name', label: '料理名', width: 200 },
    { id: 'ruby', label: 'ふりがな', width: 200 },
    { id: 'ichito', label: 'いっちゃん', width: 100 },
    { id: 'mito', label: 'みーちゃん', width: 100 },
    { id: 'delete', label: '', width: 10 },
  ];

  const filteredData = useMemo(() => {
    return evaluations.filter((e) => e.name.includes(searchWord) || e.ruby.includes(searchWord));
  }, [searchWord, evaluations]);

  return (
    <>
      <Box m={2}>
        <TextField
          label="検索フィルタ"
          variant="standard"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          sx={{ marginBottom: 1 }}
        />
        <Paper sx={{ width: '60rem' }}>
          <TableContainer sx={{ overflow: 'visible' }}>
            <Table stickyHeader size="small">
              <SortTableHead state={sort} setState={setSort} columns={columns} />
              <SortTableBody>
                {stableSort<DishEvaluation>(
                  filteredData.slice(0, 10),
                  getComparator(sort.order, sort.key),
                ).map((row) => (
                  <HybridRow
                    key={row.id}
                    isEdit={row.id === editRow}
                    row={row}
                    handleRowClick={handleRowClick(row.id)}
                    setSnackbarState={setSnackbarState}
                  />
                ))}
              </SortTableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <CustomSnackbar state={snackbarState} setSnackbarState={setSnackbarState} />
    </>
  );
}

export default DishTable;
