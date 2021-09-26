import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/system';
import { FilterStates, filterStates } from '../../config/filterStates';

interface FilterButtonProps {
  button: ButtonProps;
  filter: FilterStates;
  updateFilter: (states: FilterStates) => void;
}

const StyledMenu = styled(Menu)({
  '& ul': {
    minWidth: '180px',
  },
});

function FilterButton({ button, filter, updateFilter }: FilterButtonProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const onMenuItemClick = (state: FilterStates) => {
    updateFilter(state);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ minWidth: '180px' }} {...button}>
        Filter: {filter}
      </Button>
      <StyledMenu
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
      </StyledMenu>
    </div>
  );
}

export default FilterButton;
