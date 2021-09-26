import { render, screen } from '@testing-library/react';
import Loading from './Loading';

const loadingProps = {
  isLoading: false,
  isError: false,
};

it('should display error message if isError is set to true', () => {
  const { rerender } = render(<Loading {...loadingProps} />);

  expect(screen.queryByText('Error')).not.toBeInTheDocument();

  rerender(<Loading {...loadingProps} isError={true} errorMessage="Error message" />);

  const error = screen.getByText('Error');
  expect(error).toBeInTheDocument();

  const errorMessage = screen.getByText('Error message');
  expect(errorMessage).toBeInTheDocument();
});
