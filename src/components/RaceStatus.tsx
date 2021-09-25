import { Typography } from '@mui/material';
import { styled } from '@mui/system';

interface RaceStatusProps {
  active: boolean;
}

const Active = styled('span')(({ theme }) => ({
  color: theme.palette.success.main,
}));

const Inactive = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

function RaceStatus({ active }: RaceStatusProps): JSX.Element {
  return (
    <Typography color="text.secondary">
      Status: {active ? <Active>active</Active> : <Inactive>inactive</Inactive>}
    </Typography>
  );
}

export default RaceStatus;
