import { Link } from 'react-router-dom';
import { IconButton, Paper } from '@mui/material';
import { styled } from '@mui/system';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { Race } from '../interfaces/race';
import { routes } from '../config/routes';

const RaceLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
}));

function RaceElement({ id, name, active, participants = [] }: Race): JSX.Element {
  return (
    <RaceLink to={`${routes.RACE}/${id}`}>
      <Paper>
        <p>{name}</p>
        <p>Status: {active ? 'active' : 'inactive'}</p>
        <p>Number of participants: {participants.length}</p>
        <IconButton>
          <NavigateNext />
        </IconButton>
      </Paper>
    </RaceLink>
  );
}

export default RaceElement;
