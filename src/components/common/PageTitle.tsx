import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  label: string;
  icon: JSX.Element;
};

function PageTitle({ label, icon }: Props) {
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
      <Box component="span" sx={{ mx: (theme) => theme.spacing(1), verticalAlign: 'middle' }}>
        {icon}
      </Box>
      {label}
    </Typography>
  );
}

export default PageTitle;
