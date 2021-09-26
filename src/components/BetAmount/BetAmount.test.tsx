import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BetAmount from './BetAmount';

const betAmountProps = {
  places: {
    winnerId: 1,
    secondId: 2,
    thirdId: 3,
  },
  betAmount: '10',
  savedBetAmount: null,
  updateBetAmount: jest.fn(),
  handleBetClick: jest.fn(),
};

it('should show saved bet amount or no value info', () => {
  const { rerender } = render(<BetAmount {...betAmountProps} />);

  const noSaved = screen.getByText(/No saved bet yet/);
  expect(noSaved).toBeInTheDocument();

  rerender(<BetAmount {...betAmountProps} savedBetAmount={10} />);

  const savedAmount = screen.getByText(/Saved bet amount: 10/);
  expect(savedAmount).toBeInTheDocument();
});

it('should disable button on at least one empty place', () => {
  const { rerender } = render(
    <BetAmount {...betAmountProps} places={{ winnerId: 1, secondId: 2, thirdId: null }} />
  );

  const betButton = screen.getByRole('button', { name: 'Bet' });
  expect(betButton).toBeDisabled();

  rerender(<BetAmount {...betAmountProps} />);
  expect(betButton).not.toBeDisabled();
});

it('should disable button when participant is picked multiple times', () => {
  const { rerender } = render(
    <BetAmount {...betAmountProps} places={{ winnerId: 1, secondId: 1, thirdId: 2 }} />
  );

  const betButton = screen.getByRole('button', { name: 'Bet' });
  expect(betButton).toBeDisabled();

  rerender(<BetAmount {...betAmountProps} />);
  expect(betButton).not.toBeDisabled();
});

it('should disable button when bet amount is not a number', () => {
  const { rerender } = render(<BetAmount {...betAmountProps} betAmount="10abc" />);

  const betButton = screen.getByRole('button', { name: 'Bet' });
  expect(betButton).toBeDisabled();

  rerender(<BetAmount {...betAmountProps} />);
  expect(betButton).not.toBeDisabled();
});

it('should disable button when bet amount is empty', () => {
  const { rerender } = render(<BetAmount {...betAmountProps} betAmount="" />);

  const betButton = screen.getByRole('button', { name: 'Bet' });
  expect(betButton).toBeDisabled();

  rerender(<BetAmount {...betAmountProps} />);
  expect(betButton).not.toBeDisabled();
});

it('should disable button when bet amount is zero', () => {
  const { rerender } = render(<BetAmount {...betAmountProps} betAmount="0" />);

  const betButton = screen.getByRole('button', { name: 'Bet' });
  expect(betButton).toBeDisabled();

  rerender(<BetAmount {...betAmountProps} />);
  expect(betButton).not.toBeDisabled();
});

it('should call updateBetAmount on input change', () => {
  render(<BetAmount {...betAmountProps} betAmount="1" />);

  const betInput = screen.getByLabelText('Bet amount');
  userEvent.type(betInput, '2');

  expect(betAmountProps.updateBetAmount).toHaveBeenCalledTimes(1);
});

it('should call handleBetClick on button click', () => {
  render(<BetAmount {...betAmountProps} />);

  const betButton = screen.getByRole('button', { name: 'Bet' });
  userEvent.click(betButton);

  expect(betAmountProps.handleBetClick).toHaveBeenCalledTimes(1);
});

it('should display info when places are incorrectly set', () => {
  const { rerender } = render(
    <BetAmount {...betAmountProps} places={{ winnerId: 1, secondId: 2, thirdId: null }} />
  );

  const placeInfo = screen.getByText(/Choose winner, second and third place/);
  expect(placeInfo).toBeInTheDocument();

  rerender(<BetAmount {...betAmountProps} />);
  expect(placeInfo).not.toBeInTheDocument();
});

it('should display info when bet amount is incorrectly set', () => {
  const { rerender } = render(<BetAmount {...betAmountProps} betAmount="0" />);

  const betAmountInfo = screen.getByText(/Set bet amount/);
  expect(betAmountInfo).toBeInTheDocument();

  rerender(<BetAmount {...betAmountProps} />);
  expect(betAmountInfo).not.toBeInTheDocument();
});
