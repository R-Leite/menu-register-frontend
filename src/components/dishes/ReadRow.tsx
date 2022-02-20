import React from 'react';
import Button from '@mui/material/Button';
import StarRating from 'components/common/StarRating';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTableCell } from 'components/atoms/StyledTableCell';
import { StyledTableRow } from 'components/atoms/StyledTableRow';
import { DishEvaluation } from 'components/dishes/HybridRow';

type Props = {
  row: DishEvaluation;
  handleRowClick: () => void;
};

function ReadRow({ row, handleRowClick }: Props) {
  console.log(`Read ${row.id}描画`);

  return (
    <StyledTableRow key={row.id} data-id={row.id} onClick={handleRowClick}>
      <StyledTableCell>
        <Button variant="outlined" onClick={() => console.log(`${row.id}を保存`)}>
          保存
        </Button>
      </StyledTableCell>
      <StyledTableCell>{row.name}</StyledTableCell>
      <StyledTableCell>{row.ruby}</StyledTableCell>
      <StyledTableCell>
        <StarRating maxLevel={3} level={row.ichito} />
      </StyledTableCell>
      <StyledTableCell>
        <StarRating maxLevel={3} level={row.mito} />
      </StyledTableCell>
      <StyledTableCell>
        <IconButton size="small">
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ReadRow;
