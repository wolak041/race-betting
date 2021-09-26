import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ScrollToTop from './ScrollToTop';

it('should call scrollTo on location change', () => {
  const scrollToMock = jest.fn();
  global.scrollTo = scrollToMock;

  const history = createMemoryHistory();
  const { rerender } = render(
    <Router history={history}>
      <ScrollToTop />
    </Router>
  );

  expect(scrollToMock).toHaveBeenCalledTimes(1);
  expect(scrollToMock).toHaveBeenCalledWith(0, 0);

  history.push('/test');
  rerender(
    <Router history={history}>
      <ScrollToTop />
    </Router>
  );

  expect(scrollToMock).toHaveBeenCalledTimes(2);
});
