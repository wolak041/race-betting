import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../App';
import { FilterStates } from '../../config/filterStates';
import AllRaces, { AllRacesProps, filterRaces } from './AllRaces';

jest.mock('../../components', () => ({
  FilterButton: () => <div>Filter button</div>,
  RaceElement: ({ name }: { name: string }) => <div>{name}</div>,
}));

const allRacesProps = {
  races: [
    {
      id: 1,
      name: 'Race 1',
      active: true,
      participants: [1, 2, 3],
    },
    {
      id: 2,
      name: 'Race 2',
      active: false,
      participants: [3, 4, 5],
    },
  ],
  filter: 'All' as FilterStates,
  updateFilter: jest.fn(),
};

const Component = (props: Partial<AllRacesProps>) => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      <AllRaces {...allRacesProps} {...props} />
    </MemoryRouter>
  </ThemeProvider>
);

it('should display header', () => {
  render(<Component />);

  const headerText = screen.getByText('Race betting');
  expect(headerText).toBeInTheDocument();
});

it('should display race list', () => {
  render(<Component />);

  const raceElements = screen.getAllByText(/Race [1-9]/);
  expect(raceElements).toHaveLength(2);
});

it('should display info if races are empty', () => {
  render(<Component races={[]} />);

  const emptyInfo = screen.getByText('No races to bet');
  expect(emptyInfo).toBeInTheDocument();
});

it('should display filter button', () => {
  render(<Component />);

  const raceElements = screen.getByText('Filter button');
  expect(raceElements).toBeInTheDocument();
});

describe('filterRaces', () => {
  it('should return only active races', () => {
    const activeRaces = filterRaces(allRacesProps.races, 'Active');
    expect(activeRaces).toHaveLength(1);
    expect(activeRaces[0]).toHaveProperty('name', 'Race 1');
  });

  it('should return only inactive races', () => {
    const activeRaces = filterRaces(allRacesProps.races, 'Inactive');
    expect(activeRaces).toHaveLength(1);
    expect(activeRaces[0]).toHaveProperty('name', 'Race 2');
  });
});
