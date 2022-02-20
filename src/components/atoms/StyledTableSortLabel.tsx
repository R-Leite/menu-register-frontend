import TableSortLabel from '@mui/material/TableSortLabel';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

export const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    color: theme.palette.primary.contrastText,
    '&hover': {
      color: theme.palette.primary.contrastText,
    },
    '&$active': {
      color: theme.palette.primary.contrastText,
    },
  },
  active: {},
  icon: {
    color: 'inherit !important',
  },
}));
