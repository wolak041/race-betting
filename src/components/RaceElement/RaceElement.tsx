import { Link } from 'react-router-dom';
import { IconButton, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { RaceStatus } from '../';
import { Race } from '../../interfaces';
import { routes } from '../../config/routes';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  transition: 'background-color 0.2s ease-in-out',
  ':hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

function RaceElement({ id, name, active, participants = [] }: Race): JSX.Element {
  return (
    <StyledLink to={`${routes.RACE}/${id}`}>
      <StyledPaper>
        <div>
          <Typography variant="h6">{name}</Typography>
          <RaceStatus active={active} />
          <Typography color="text.secondary" variant="body2">
            Number of participants: {participants.length}
          </Typography>
        </div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconButton>
            <NavigateNext />
          </IconButton>
        </Box>
      </StyledPaper>
    </StyledLink>
  );
}

export default RaceElement;
