import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { DishEvaluation } from 'components/dishes/HybridRow';
import { StyledTableCell } from 'components/atoms/StyledTableCell';
import { StyledTableRow } from 'components/atoms/StyledTableRow';

const subjectCell: SxProps<Theme> = {
  backgroundColor: '#42a5f5',
  color: 'white',
  textAlign: 'center',
};

const bodyCell: SxProps<Theme> = {
  backgroundColor: '#ffd',
  textAlign: 'right',
};

const columns = [
  { id: 0, label: '' },
  { id: 1, label: 'ほし1' },
  { id: 2, label: 'ほし2' },
  { id: 3, label: 'ほし3' },
];

type Props = {
  evaluations: DishEvaluation[];
};

function DishHeader({ evaluations }: Props) {
  const ichitoRate = [...Array(3).keys()].map(
    (x) => evaluations.filter((y) => y.ichito === x + 1).length,
  );
  const mitoRate = [...Array(3).keys()].map(
    (x) => evaluations.filter((y) => y.mito === x + 1).length,
  );

  return (
    <Box sx={{ display: 'inline-flex' }}>
      <TableContainer component={Paper} sx={{ margin: 2, width: '30rem' }}>
        <Table size="small">
          <TableHead>
            <StyledTableRow>
              {columns.map((x) => (
                <StyledTableCell key={x.id} sx={{ textAlign: 'center' }}>
                  {x.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell sx={subjectCell}>いちと</StyledTableCell>
              {ichitoRate.map((x) => (
                <StyledTableCell sx={bodyCell}>{x}</StyledTableCell>
              ))}
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell sx={subjectCell}>みと</StyledTableCell>
              {mitoRate.map((x) => (
                <StyledTableCell sx={bodyCell}>{x}</StyledTableCell>
              ))}
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography marginTop={12}>合計：{evaluations.length}</Typography>
    </Box>
  );
}

export default DishHeader;
