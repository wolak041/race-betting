import { Participant } from "../interfaces/participant";

const PARTICIPANT_API = 'https://my-json-server.typicode.com/hdjfye/bet-api/participants';

export async function getParticipants(): Promise<Array<Participant>> {
  const response = await fetch(PARTICIPANT_API);
  const participants = await response.json();

  return participants;
}

export async function getParticipant(raceId: number): Promise<Participant> {
  const response = await fetch(`${PARTICIPANT_API}/${raceId}`);
  const participant = await response.json();

  return participant;
}
