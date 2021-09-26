import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import FilterListIcon from '@mui/icons-material/FilterList';
import { RaceElement, FilterButton } from '../../components';
import { Race } from '../../interfaces';
import { filterStates, FilterStates } from '../../config/filterStates';

export interface AllRacesProps {
  races: Array<Race>;
  filter: FilterStates;
  updateFilter: (filter: FilterStates) => void;
}

export const filterRaces = (races: Array<Race>, filter: FilterStates): Array<Race> => {
  switch (filter) {
    case filterStates.ACTIVE:
      return races.filter((race) => race.active);
    case filterStates.INACTIVE:
      return races.filter((race) => !race.active);
    default:
      return races;
  }
};

const StyledHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: theme.spacing(4),
  letterSpacing: theme.spacing(1),
  textTransform: 'uppercase',
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  marginTop: theme.spacing(4),
}));

function AllRaces({ races, filter, updateFilter }: AllRacesProps): JSX.Element {
  return (
    <div>
      <StyledHeader variant="h3">Race betting</StyledHeader>
      <FilterButton
        button={{
          variant: 'contained',
          startIcon: <FilterListIcon />,
        }}
        filter={filter}
        updateFilter={updateFilter}
      />
      <div>
        {races.length > 0 ? (
          filterRaces(races, filter).map((race) => <RaceElement {...race} key={race.id} />)
        ) : (
          <StyledInfo>No races to bet</StyledInfo>
        )}
      </div>
    </div>
  );
}

export default AllRaces;
