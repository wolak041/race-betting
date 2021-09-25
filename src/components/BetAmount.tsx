import { Alert, Button, TextField, Box } from '@mui/material';
import Send from '@mui/icons-material/Send';
import { Places } from '../interfaces/places';
import { styled } from '@mui/system';

interface BetAmountProps {
  places: Places;
  betAmount: string;
  updateBetAmount: (amount: string) => void;
  handleBetClick: (event: React.MouseEvent) => void;
}

const isPlacesValid = (places: Places) =>
  [...new Set(Object.values(places).filter(Number))].length === 3;

const isBetAmountValid = (amount: string) => /^[1-9][0-9]*$/.test(amount.trim());

const StyledAlert = styled(Alert)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
});

const StyledDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingBottom: theme.spacing(6.5),
}));

function BetAmount({
  places,
  betAmount,
  updateBetAmount,
  handleBetClick,
}: BetAmountProps): JSX.Element {
  return (
    <div>
      <div>
        <TextField
          label="Bet amount"
          value={betAmount}
          onChange={(e) => updateBetAmount(e.target.value)}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <Button
          variant="contained"
          size="large"
          endIcon={<Send />}
          onClick={handleBetClick}
          disabled={!isPlacesValid(places) || !isBetAmountValid(betAmount)}
        >
          Bet
        </Button>
      </div>
      <StyledDiv>
        {!isPlacesValid(places) ? (
          <StyledAlert severity="info">Choose winner, second and third place</StyledAlert>
        ) : (
          !isBetAmountValid(betAmount) && <StyledAlert severity="info">Set bet amount</StyledAlert>
        )}
      </StyledDiv>
    </div>
  );
}

export default BetAmount;
