import React from 'react';
import Typography from '@mui/material/Typography';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';

type Props = {
  label: string;
};

function PageTitle({ label }: Props) {
  return (
    <Typography
      sx={{
        margin: (theme) => theme.spacing(2),
        borderLeft: '6px solid',
        borderLeftColor: (theme) => theme.palette.primary.main,
        borderBottom: '1px solid #ccc',
      }}
      variant="h4"
    >
      <FormatListBulleted
        sx={{ marginLeft: (theme) => theme.spacing(1), marginRight: (theme) => theme.spacing(1) }}
      />
      {label}
    </Typography>
  );
}

export default PageTitle;
