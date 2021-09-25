import { Typography } from '@mui/material';
import { styled } from '@mui/system';

interface MainProps {
  children: React.ReactNode;
}

const StyledDiv = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  maxWidth: '800px',
  margin: '0 auto',

  '& > h3': {
    marginBottom: theme.spacing(4),
    letterSpacing: theme.spacing(1),
    textTransform: 'uppercase',
  },
}));

function Main(props: MainProps): JSX.Element {
  return <StyledDiv>{props.children}</StyledDiv>;
}

export default Main;
