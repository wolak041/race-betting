import Places from './places';

export default interface Bet extends Places {
  raceId: number;
  betAmount: number;
}
