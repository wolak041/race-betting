import '@testing-library/jest-dom';

const fetchMock = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);
global.fetch = fetchMock as jest.Mock;
