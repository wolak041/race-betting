import {
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Participant } from '../interfaces/participant';
import { Places } from '../interfaces/places';

interface ParticipantsTableProps {
  participants: Array<Participant>;
  places: Places;
  handleRadioChange: (participantId: number, type: keyof Places) => void;
}

function ParticipantsTable({
  participants,
  places,
  handleRadioChange,
}: ParticipantsTableProps): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Participant</TableCell>
            <TableCell align="center">Winner</TableCell>
            <TableCell align="center">Second place</TableCell>
            <TableCell align="center">Third place</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>{participant.body}</TableCell>
              <TableCell align="center">
                <Radio
                  value={participant.id}
                  onChange={() => handleRadioChange(participant.id, 'winnerId')}
                  checked={places.winnerId === participant.id}
                />
              </TableCell>
              <TableCell align="center">
                <Radio
                  value={participant.id}
                  onChange={() => handleRadioChange(participant.id, 'secondId')}
                  checked={places.secondId === participant.id}
                />
              </TableCell>
              <TableCell align="center">
                <Radio
                  value={participant.id}
                  onChange={() => handleRadioChange(participant.id, 'thirdId')}
                  checked={places.thirdId === participant.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ParticipantsTable;
