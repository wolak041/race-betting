import { Places } from './places';

export interface Bet extends Places {
  raceId: number;
  betAmount: number;
}
