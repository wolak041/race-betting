import { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { Race, Participant, Places, Bet } from '../../interfaces';
import { routes } from '../../config/routes';
import { ParticipantsTable, RaceStatus, BetAmount } from '../../components';

export interface SingleRaceProps {
  races: Array<Race>;
  allParticipants: Array<Participant>;
  bets: Array<Bet>;
  updateBets: (bet: Bet) => void;
  isLoading: boolean;
}

const getRace = (races: Array<Race>, raceId: number) => races.find((race) => race.id === raceId);

const getParticipants = (allParticipants: Array<Participant>, raceParticipants: Array<number>) =>
  allParticipants.filter((participant) => raceParticipants.includes(participant.id));

const getBet = (bets: Array<Bet>, raceId: number) => bets.find((bet) => bet.raceId === raceId);

const StyledRoot = styled('div')(({ theme }) => ({
  '& > div': {
    marginBottom: theme.spacing(3),
  },
}));

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'right',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  marginBottom: theme.spacing(3),
  marginRight: theme.spacing(3),

  '& > button': {
    minWidth: '130px',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

function SingleRace({
  races,
  allParticipants,
  bets,
  updateBets,
  isLoading,
}: SingleRaceProps): JSX.Element {
  const history = useHistory();
  const urlParams = useParams<{ raceId: string }>();
  const race = getRace(races, parseInt(urlParams.raceId, 10));
  const raceParticipants = race?.participants
    ? getParticipants(allParticipants, race?.participants)
    : [];

  useEffect(() => {
    !isLoading && !race && history.push(routes.MAIN);
  }, [history, isLoading, race]);

  const [places, setPlaces] = useState<Places>({
    winnerId: null,
    secondId: null,
    thirdId: null,
  });
  const handleRadioChange = (participantId: number, type: keyof Places) =>
    setPlaces((prev) => ({ ...prev, [type]: participantId }));

  const [betAmount, setBetAmount] = useState('0');
  const [savedBetAmount, setSavedBetAmount] = useState<number | null>(null);

  useEffect(() => {
    const bet = getBet(bets, parseInt(urlParams.raceId, 10));

    if (bet) {
      setPlaces({
        winnerId: bet.winnerId,
        secondId: bet.secondId,
        thirdId: bet.thirdId,
      });
      setBetAmount(bet.betAmount.toString());
      setSavedBetAmount(bet.betAmount);
    }
  }, [bets, urlParams.raceId]);

  const handleBetClick = () =>
    race?.id &&
    updateBets({
      raceId: race?.id,
      ...places,
      betAmount: parseInt(betAmount, 10),
    });

  return (
    <StyledRoot>
      <StyledHeader>
        <StyledLink to={routes.MAIN}>
          <Button variant="outlined" startIcon={<NavigateBefore />}>
            Go back
          </Button>
        </StyledLink>
        <div>
          <StyledTypography variant="h4">{race?.name ?? 'Race name'}</StyledTypography>
          <RaceStatus active={race?.active ?? false} />
        </div>
      </StyledHeader>
      <ParticipantsTable
        participants={raceParticipants}
        places={places}
        handleRadioChange={handleRadioChange}
      />
      <BetAmount
        places={places}
        betAmount={betAmount}
        savedBetAmount={savedBetAmount}
        updateBetAmount={(amount) => setBetAmount(amount)}
        handleBetClick={handleBetClick}
      />
    </StyledRoot>
  );
}

export default SingleRace;
