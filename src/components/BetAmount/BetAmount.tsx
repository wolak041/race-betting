import { Alert, Button, TextField, Typography } from '@mui/material';
import Send from '@mui/icons-material/Send';
import { Places } from '../../interfaces';
import { styled } from '@mui/system';

interface BetAmountProps {
  places: Places;
  betAmount: string;
  savedBetAmount: number | null;
  updateBetAmount: (amount: string) => void;
  handleBetClick: (event: React.MouseEvent) => void;
}

const isPlacesValid = (places: Places) =>
  [...new Set(Object.values(places).filter(Number))].length === 3;

const isBetAmountValid = (amount: string) => /^[1-9][0-9]{0,11}$/.test(amount.trim());

const StyledAlert = styled(Alert)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
});

const StyledBetContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',

    '& > p': {
      marginBottom: theme.spacing(3),
      textAlign: 'center',
    },
  },
}));

const StyledBet = styled('div')(({ theme }) => ({
  display: 'flex',
  marginLeft: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },

  '& > div': {
    minWidth: '100px',
    flex: 1,
  },

  '& > button': {
    marginLeft: theme.spacing(2),
  },
}));

const StyledInfo = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingBottom: theme.spacing(7),
}));

function BetAmount({
  places,
  betAmount,
  savedBetAmount,
  updateBetAmount,
  handleBetClick,
}: BetAmountProps): JSX.Element {
  return (
    <div>
      <StyledBetContainer>
        <Typography>
          {savedBetAmount ? `Saved bet amount: ${savedBetAmount}` : 'No saved bet yet'}
        </Typography>
        <StyledBet>
          <TextField
            label="Bet amount"
            id="bet-amount"
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
        </StyledBet>
      </StyledBetContainer>
      <StyledInfo>
        {!isPlacesValid(places) ? (
          <StyledAlert severity="info">Choose winner, second and third place</StyledAlert>
        ) : (
          !isBetAmountValid(betAmount) && <StyledAlert severity="info">Set bet amount</StyledAlert>
        )}
      </StyledInfo>
    </div>
  );
}

export default BetAmount;
