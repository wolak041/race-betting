import { useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import RaceElement from '../components/RaceElement';
import { Race } from '../interfaces/race';
import { getRaces } from '../services/races';
import FilterButton from '../components/FilterButton';
import { filterStates, FilterStates } from '../config/filterStates';

interface AllRacesProps {
  races: Array<Race>;
  updateRaces: (races: Array<Race>) => void;
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

function AllRaces({ races, updateRaces, filter, updateFilter }: AllRacesProps): JSX.Element {
  useEffect(() => {
    const loadRaces = async () => {
      const races = await getRaces();
      updateRaces(races);
    };

    loadRaces();
  }, [updateRaces]);

  return (
    <div>
      <div>
        <FilterButton
          button={{
            variant: 'contained',
            startIcon: <FilterListIcon />,
          }}
          filter={filter}
          updateFilter={updateFilter}
        >
          Filter
        </FilterButton>
      </div>
      <div>
        {races.length > 0 &&
          filterRaces(races, filter).map((race) => <RaceElement {...race} key={race.id} />)}
      </div>
    </div>
  );
}

export default AllRaces;
