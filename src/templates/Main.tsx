import { styled } from '@mui/system';

interface MainProps {
  children: React.ReactNode;
}

const Root = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

function Main(props: MainProps): JSX.Element {
  return <Root>{props.children}</Root>;
}

export default Main;
