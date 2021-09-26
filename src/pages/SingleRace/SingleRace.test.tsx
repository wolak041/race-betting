import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../App';
import SingleRace, { SingleRaceProps } from './SingleRace';
import { routes } from '../../config/routes';

jest.mock('../../components', () => ({
  ParticipantsTable: () => <div>Participants table</div>,
  RaceStatus: () => <div>Race status</div>,
  BetAmount: () => <div>Bet amount</div>,
}));

const allRacesProps = {
  races: [
    {
      id: 1,
      name: 'Race 1',
      active: true,
      participants: [1, 2, 3],
    },
  ],
  allParticipants: [
    {
      id: 1,
      body: 'Participant 1',
    },
    {
      id: 2,
      body: 'Participant 2',
    },
    {
      id: 3,
      body: 'Participant 3',
    },
  ],
  bets: [
    {
      winnerId: 1,
      secondId: 2,
      thirdId: 3,
      raceId: 1,
      betAmount: 100,
    },
  ],
  updateBets: jest.fn(),
  isLoading: false,
};

const Component = (props: Partial<SingleRaceProps>) => {
  const history = createMemoryHistory();
  history.push(`${routes.RACE}/1`);

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Route path="/race/:raceId">
          <SingleRace {...allRacesProps} {...props} />
        </Route>
      </Router>
    </ThemeProvider>
  );
};

it('should display link button with correct href', () => {
  render(<Component />);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/');
});

it('should display correct race name', () => {
  render(<Component />);

  const raceName = screen.getByText('Race 1');
  expect(raceName).toBeInTheDocument();
});

it('should display race status', () => {
  render(<Component />);

  const raceStatus = screen.getByText('Race status');
  expect(raceStatus).toBeInTheDocument();
});

it('should display participants table', () => {
  render(<Component />);

  const participantsTable = screen.getByText('Participants table');
  expect(participantsTable).toBeInTheDocument();
});

it('should display bet amount', () => {
  render(<Component />);

  const betAmount = screen.getByText('Bet amount');
  expect(betAmount).toBeInTheDocument();
});

it('should change url to main page if race does not exist', () => {
  const history = createMemoryHistory();
  history.push(`${routes.RACE}/100`);

  render(
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Route path="/race/:raceId">
          <SingleRace {...allRacesProps} />
        </Route>
      </Router>
    </ThemeProvider>
  );

  const raceName = screen.queryByText('Race 100');
  expect(raceName).not.toBeInTheDocument();

  const participantsTable = screen.queryByText('Participants table');
  expect(participantsTable).not.toBeInTheDocument();

  const betAmount = screen.queryByText('Bet amount');
  expect(betAmount).not.toBeInTheDocument();

  expect(history.location.pathname).toBe(routes.MAIN);
});
