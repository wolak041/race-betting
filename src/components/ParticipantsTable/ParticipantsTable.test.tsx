import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ParticipantsTable from './ParticipantsTable';

const participantsTableProps = {
  participants: [
    {
      id: 1,
      body: 'participant 1',
    },
    {
      id: 2,
      body: 'participant 2',
    },
    {
      id: 3,
      body: 'participant 3',
    },
  ],
  places: {
    winnerId: 2,
    secondId: 1,
    thirdId: 3,
  },
  handleRadioChange: jest.fn(),
};

it('should display table with participants names', () => {
  render(<ParticipantsTable {...participantsTableProps} />);

  const participantOne = screen.getByText('participant 1');
  expect(participantOne).toBeInTheDocument();

  const participantTwo = screen.getByText('participant 2');
  expect(participantTwo).toBeInTheDocument();

  const participantThree = screen.getByText('participant 3');
  expect(participantThree).toBeInTheDocument();
});

it('should call handleRadioChange on radio change', () => {
  render(<ParticipantsTable {...participantsTableProps} />);

  const participantOneWinnerRadio = screen.getAllByRole('radio')[0];
  userEvent.click(participantOneWinnerRadio);

  expect(participantsTableProps.handleRadioChange).toHaveBeenCalledWith(1, 'winnerId');
});
