import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell } from 'components/atoms/StyledTableCell';
import { StyledTableSortLabel } from 'components/atoms/StyledTableSortLabel';

export type sortState = {
  order: 'desc' | 'asc';
  key: string;
};

export type HeadCell = {
  id: string;
  label: string;
  width?: number;
};

type Props = {
  state: sortState;
  setState: React.Dispatch<React.SetStateAction<sortState>>;
  columns: HeadCell[];
};

function SortTableHead({ state, setState, columns }: Props) {
  // ヘッダークリック時
  const handleSortColumnClick = (col: string) => () => {
    const isDesc = col === state.key && state.order === 'desc';
    const order = isDesc ? 'asc' : 'desc';
    setState({
      order,
      key: col,
    });
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <StyledTableCell
            key={col.id}
            sortDirection={state.key === col.id ? state.order : false}
            width={col.width}
          >
            <StyledTableSortLabel
              active={state.key === col.id}
              direction={state.order}
              onClick={handleSortColumnClick(col.id)}
            >
              {col.label}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SortTableHead;
