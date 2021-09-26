import { Bet } from '../interfaces';

export function getBetsFromLocalStorage(): Array<Bet> {
  const bets = localStorage.getItem('bets');
  return bets ? JSON.parse(bets) : [];
}

export function setBetsToLocalStorage(bets: Array<Bet>): void {
  localStorage.setItem('bets', JSON.stringify(bets));
}
