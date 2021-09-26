import { Race } from '../interfaces/race';
import { Participant } from '../interfaces/participant';

const RACE_API = 'https://my-json-server.typicode.com/hdjfye/bet-api/races';
const PARTICIPANT_API = 'https://my-json-server.typicode.com/hdjfye/bet-api/participants';

export async function getInitData(): Promise<{
  races: Array<Race>;
  participants: Array<Participant>;
}> {
  const [racesResponse, participantsResponse] = await Promise.all([
    fetch(RACE_API),
    fetch(PARTICIPANT_API),
  ]);
  const [races, participants] = await Promise.all([
    racesResponse.json(),
    participantsResponse.json(),
  ]);

  return { races, participants };
}
