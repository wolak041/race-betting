import { Race } from '../interfaces/race';

const RACE_API = 'https://my-json-server.typicode.com/hdjfye/bet-api/races';

export async function getRaces(): Promise<Array<Race>> {
  const response = await fetch(RACE_API);
  const races = await response.json();

  return races;
}

export async function getRace(raceId: number): Promise<Race> {
  const response = await fetch(`${RACE_API}/${raceId}`);
  const race = await response.json();

  return race;
}