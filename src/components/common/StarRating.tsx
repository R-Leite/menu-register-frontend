import React from 'react';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

type Props = {
  maxLevel: number;
  level: number;
  // eslint-disable-next-line react/require-default-props
  handleRateChange?: (rate: number) => () => void;
};

function StarRating({ maxLevel, level, handleRateChange = () => () => ({}) }: Props) {
  return (
    <>
      {[...Array(maxLevel).keys()].map((i) => {
        const color = i < level ? yellow[500] : undefined;

        return (
          <IconButton
            sx={{ color }}
            key={i}
            size="small"
            edge="start"
            onClick={handleRateChange(i + 1)}
          >
            <StarIcon />
          </IconButton>
        );
      })}
    </>
  );
}

export default StarRating;
