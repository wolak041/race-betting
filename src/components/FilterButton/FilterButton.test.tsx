import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterStates } from '../../config/filterStates';
import FilterButton from './FilterButton';

const filterButtonProps = {
  filter: 'All' as FilterStates,
  updateFilter: jest.fn(),
};

it('should show filter state', () => {
  render(<FilterButton {...filterButtonProps} />);

  const filterButton = screen.getByRole('button', { name: 'Filter: All' });
  expect(filterButton).toBeInTheDocument();
});

it('should display menu with filter states', () => {
  render(<FilterButton {...filterButtonProps} />);

  const filterButton = screen.getByRole('button', { name: 'Filter: All' });

  expect(screen.queryByText(/^All/)).not.toBeInTheDocument();

  userEvent.click(filterButton);

  const allState = screen.queryByText(/^All/);
  expect(allState).toBeInTheDocument();

  const activeState = screen.getByText('Active');
  expect(activeState).toBeInTheDocument();

  const inactiveState = screen.getByText('Inactive');
  expect(inactiveState).toBeInTheDocument();
});

it('should call updateFilter on menu element click', () => {
  render(<FilterButton {...filterButtonProps} />);

  const filterButton = screen.getByRole('button', { name: 'Filter: All' });
  userEvent.click(filterButton);

  const activeState = screen.getByText('Active');
  userEvent.click(activeState);

  expect(filterButtonProps.updateFilter).toHaveBeenCalledTimes(1);
});
