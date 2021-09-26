import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { theme } from '../../App';
import RaceElement from './RaceElement';

jest.mock('../', () => ({
  RaceStatus: () => <div>Race status</div>,
}));

const raceElementProps = {
  id: 1,
  name: 'Race name',
  active: true,
  participants: [1, 2, 3],
};

const Component = () => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      <RaceElement {...raceElementProps} />
    </MemoryRouter>
  </ThemeProvider>
);

it('should display link with correct href', () => {
  render(<Component />);

  const raceName = screen.getByRole('link');
  expect(raceName).toHaveAttribute('href', '/race/1');
});

it('should display race name', () => {
  render(<Component />);

  const raceName = screen.getByText('Race name');
  expect(raceName).toBeInTheDocument();
});

it('should display race status', () => {
  render(<Component />);

  const raceName = screen.getByText('Race status');
  expect(raceName).toBeInTheDocument();
});

it('should display number of race participants', () => {
  render(<Component />);

  const participantNumber = screen.getByText('Number of participants: 3');
  expect(participantNumber).toBeInTheDocument();
});
