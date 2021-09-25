import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import FilterListIcon from '@mui/icons-material/FilterList';
import RaceElement from '../components/RaceElement';
import { Race } from '../interfaces/race';
import FilterButton from '../components/FilterButton';
import { filterStates, FilterStates } from '../config/filterStates';

interface AllRacesProps {
  races: Array<Race>;
  filter: FilterStates;
  updateFilter: (filter: FilterStates) => void;
}

const filterRaces = (races: Array<Race>, filter: FilterStates) => {
  switch (filter) {
    case filterStates.ACTIVE:
      return races.filter((race) => race.active);
    case filterStates.INACTIVE:
      return races.filter((race) => !race.active);
    default:
      return races;
  }
};

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: theme.spacing(4),
  letterSpacing: theme.spacing(1),
  textTransform: 'uppercase',
}));

function AllRaces({ races, filter, updateFilter }: AllRacesProps): JSX.Element {
  return (
    <div>
      <StyledTypography variant="h3">Race betting</StyledTypography>
      <FilterButton
        button={{
          variant: 'contained',
          startIcon: <FilterListIcon />,
        }}
        filter={filter}
        updateFilter={updateFilter}
      />
      <div>
        {races.length > 0 &&
          filterRaces(races, filter).map((race) => <RaceElement {...race} key={race.id} />)}
      </div>
    </div>
  );
}

export default AllRaces;
