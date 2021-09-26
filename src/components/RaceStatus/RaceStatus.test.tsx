import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import { theme } from '../../App';
import RaceStatus from './RaceStatus';

const Component = (props: { active: boolean }) => (
  <ThemeProvider theme={theme}>
    <RaceStatus {...props} />
  </ThemeProvider>
);

it('should display inactive status', () => {
  render(<Component active={true} />);

  const raceName = screen.getByText('active');
  expect(raceName).toBeInTheDocument();
});

it('should display active status', () => {
  render(<Component active={false} />);

  const raceName = screen.getByText('inactive');
  expect(raceName).toBeInTheDocument();
});
