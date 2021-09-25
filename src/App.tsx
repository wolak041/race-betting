import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Main from './templates/Main';
import AllRaces from './pages/AllRaces';
import SingleRace from './pages/SingleRace';
import { getRaces } from './services/races';
import { getParticipants } from './services/participants';
import { Race } from './interfaces/race';
import { Participant } from './interfaces/participant';
import { Bet } from './interfaces/bet';
import { routes } from './config/routes';
import { FilterStates, filterStates } from './config/filterStates';
import { getBetsFromLocalStorage, setBetsToLocalStorage } from './utils/localStorage';

function App(): JSX.Element {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#a93cff',
      },
      secondary: {
        main: '#081026',
      },
      text: {
        primary: '#fff',
        secondary: '#e4e4e4',
      },
      background: {
        default: '#081026',
        paper: '#081026',
      },
    },
    typography: {
      fontFamily: [
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Open Sans',
      ].join(','),
    },
  });

  const [races, setRaces] = useState<Array<Race>>([]);
  useEffect(() => {
    const loadRaces = async () => {
      const races = await getRaces();
      setRaces(races);
    };

    loadRaces();
  }, []);

  const [participants, setParticipants] = useState<Array<Participant>>([]);
  useEffect(() => {
    const loadParticipants = async () => {
      const participants = await getParticipants();
      setParticipants(participants);
    };

    loadParticipants();
  }, []);

  const [bets, setBets] = useState<Array<Bet>>([]);
  const updateBets = (bet: Bet) => {
    setBets((prev) => {
      const isBetSet = prev.find((savedBet) => savedBet.raceId === bet.raceId);

      const newBets = isBetSet
        ? prev.reduce(
            (updatedBets: Array<Bet>, savedBet: Bet) =>
              savedBet.raceId === bet.raceId ? [...updatedBets, bet] : [...updatedBets, savedBet],
            []
          )
        : [...prev, bet];

      setBetsToLocalStorage(newBets);
      return newBets;
    });
  };
  useEffect(() => {
    const savedBets = getBetsFromLocalStorage();
    setBets(savedBets);
  }, []);

  const [filter, setFilter] = useState<FilterStates>(filterStates.ALL as FilterStates);
  const updateFilter = (filter: FilterStates) => setFilter(filter);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Main>
          <Switch>
            <Route path={`${routes.RACE}/:raceId`}>
              <SingleRace
                races={races}
                allParticipants={participants}
                bets={bets}
                updateBets={updateBets}
              />
            </Route>
            <Route path={routes.MAIN}>
              <AllRaces races={races} filter={filter} updateFilter={updateFilter} />
            </Route>
          </Switch>
        </Main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
