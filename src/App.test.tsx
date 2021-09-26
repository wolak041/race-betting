import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './App';
import { routes } from './config/routes';
import { getInitData } from './services/initData';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('./components', () => ({
  ScrollToTop: () => <div>Scroll to top</div>,
  Loading: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="loading">{children}</div>
  ),
}));

jest.mock('./pages', () => ({
  AllRaces: () => <div>All races</div>,
  SingleRace: () => <div>Single race</div>,
}));

jest.mock('./services/initData');

const Component = () => (
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

afterEach(async () => {
  jest.resetAllMocks();
});

it('should render scroll to top', async () => {
  render(<Component />);

  const scrollToTop = screen.getByText('Scroll to top');
  expect(scrollToTop).toBeInTheDocument();

  await waitFor(() => expect(getInitData).toHaveBeenCalled());
});

it('should render Loading', async () => {
  render(<Component />);

  const loading = screen.getByTestId('loading');
  expect(loading).toBeInTheDocument();

  await waitFor(() => expect(getInitData).toHaveBeenCalled());
});

it('should render all races as default page', async () => {
  render(<Component />);

  const allRaces = screen.getByText('All races');
  expect(allRaces).toBeInTheDocument();

  const singleRace = screen.queryByText('Single races');
  expect(singleRace).not.toBeInTheDocument();

  await waitFor(() => expect(getInitData).toHaveBeenCalled());
});

it('should render single race', async () => {
  const history = createMemoryHistory();
  history.push(`${routes.RACE}/1`);

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const singleRace = screen.getByText('Single race');
  expect(singleRace).toBeInTheDocument();

  const allRaces = screen.queryByText('All races');
  expect(allRaces).not.toBeInTheDocument();

  await waitFor(() => expect(getInitData).toHaveBeenCalled());
});

it('should call getInitData on init', async () => {
  render(<Component />);

  await waitFor(() => expect(getInitData).toHaveBeenCalledTimes(1));
});
