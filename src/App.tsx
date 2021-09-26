import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Main from './templates/Main';
import { AllRaces, SingleRace } from './pages';
import { getInitData } from './services/initData';
import { Race, Participant, Bet } from './interfaces';
import { routes } from './config/routes';
import { FilterStates, filterStates } from './config/filterStates';
import { getBetsFromLocalStorage, setBetsToLocalStorage } from './utils/localStorage';
import { ScrollToTop, Loading } from './components';

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

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [races, setRaces] = useState<Array<Race>>([]);
  const [participants, setParticipants] = useState<Array<Participant>>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getInitData();
        setRaces(data.races);
        setParticipants(data.participants);

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    loadData();
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
        <ScrollToTop />
        <Main>
          <Loading isLoading={isLoading} isError={isError} errorMessage="Couldn't load races">
            <Switch>
              <Route path={`${routes.RACE}/:raceId`}>
                <SingleRace
                  races={races}
                  allParticipants={participants}
                  bets={bets}
                  updateBets={updateBets}
                  isLoading={isLoading}
                />
              </Route>
              <Route path={routes.MAIN}>
                <AllRaces races={races} filter={filter} updateFilter={updateFilter} />
              </Route>
            </Switch>
          </Loading>
        </Main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
