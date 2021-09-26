import { getInitData } from './initData';

it('should fetch races and participants', () => {
  getInitData();

  expect(global.fetch).toHaveBeenCalledTimes(2);
  expect(global.fetch).toHaveBeenNthCalledWith(
    1,
    'https://my-json-server.typicode.com/hdjfye/bet-api/races'
  );
  expect(global.fetch).toHaveBeenNthCalledWith(
    2,
    'https://my-json-server.typicode.com/hdjfye/bet-api/participants'
  );
});
