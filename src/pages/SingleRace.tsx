import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import Send from '@mui/icons-material/Send';
import { Race } from '../interfaces/race';
import { Participant } from '../interfaces/participant';
import { Places } from '../interfaces/places';
import { Bet } from '../interfaces/bet';
import { routes } from '../config/routes';
import ParticipantsTable from '../components/ParticipantsTable';

interface RaceProps {
  races: Array<Race>;
  allParticipants: Array<Participant>;
  bets: Array<Bet>;
  updateBets: (bet: Bet) => void;
}

const getRace = (races: Array<Race>, raceId: number) => races.find((race) => race.id === raceId);

const getParticipants = (allParticipants: Array<Participant>, raceParticipants: Array<number>) =>
  allParticipants.filter((participant) => raceParticipants.includes(participant.id));

const getBet = (bets: Array<Bet>, raceId: number) => bets.find((bet) => bet.raceId === raceId);

const isPlacesValid = (places: Places) =>
  [...new Set(Object.values(places).filter(Number))].length === 3;

const isBetAmountValid = (amount: string) => /^[0-9]*$/.test(amount.trim());

const BackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
}));

function SingleRace({ races, allParticipants, bets, updateBets }: RaceProps): JSX.Element {
  const urlParams = useParams<{ raceId: string }>();
  const race = getRace(races, parseInt(urlParams.raceId, 10));
  const raceParticipants = race?.participants
    ? getParticipants(allParticipants, race?.participants)
    : [];

  const [places, setPlaces] = useState<Places>({
    winnerId: null,
    secondId: null,
    thirdId: null,
  });
  const handleRadioChange = (participantId: number, type: keyof Places) =>
    setPlaces((prev) => ({ ...prev, [type]: participantId }));

  const [betAmount, setBetAmount] = useState('0');

  useEffect(() => {
    const bet = getBet(bets, parseInt(urlParams.raceId, 10));

    if (bet) {
      setPlaces({
        winnerId: bet.winnerId,
        secondId: bet.secondId,
        thirdId: bet.thirdId,
      });
      setBetAmount(bet.betAmount.toString());
    }
  }, [bets, urlParams.raceId]);

  const handleButtonClick = () =>
    race?.id &&
    updateBets({
      raceId: race?.id,
      ...places,
      betAmount: parseInt(betAmount, 10),
    });

  return (
    <div>
      <div>
        <BackLink to={routes.MAIN}>
          <Button variant="outlined" startIcon={<NavigateBefore />}>
            Go back
          </Button>
        </BackLink>
        <p>{race?.name ?? 'Race name'}</p>
        <p>Status: {race?.active ? 'active' : 'inactive'}</p>
      </div>
      <ParticipantsTable
        participants={raceParticipants}
        places={places}
        handleRadioChange={handleRadioChange}
      />
      <div>
        <TextField
          label="Bet amount"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <Button
          variant="contained"
          size="large"
          endIcon={<Send />}
          onClick={handleButtonClick}
          disabled={!isPlacesValid(places) || !isBetAmountValid(betAmount)}
        >
          Bet
        </Button>
      </div>
    </div>
  );
}

export default SingleRace;
