import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import { FilterStates, filterStates } from '../config/filterStates';

interface FilterButtonProps extends ButtonProps {
  button: ButtonProps;
  filter: FilterStates;
  updateFilter: (states: FilterStates) => void;
}

function FilterButton({ button, filter, updateFilter }: FilterButtonProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const onMenuItemClick = (state: FilterStates) => {
    updateFilter(state);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)} {...button}>
        Filter: {filter}
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {Object.values(filterStates).map((state) => (
          <MenuItem onClick={() => onMenuItemClick(state as FilterStates)} key={state}>
            {state}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default FilterButton;
