import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_VISIBLE_TYPES } from '@/constants/locationTypes';

interface FiltersState {
  visibleTypes: string[];
  searchQuery: string;
}

const initialState: FiltersState = {
  visibleTypes: Array.from(DEFAULT_VISIBLE_TYPES),
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleLocationType: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      const index = state.visibleTypes.indexOf(type);
      if (index > -1) {
        state.visibleTypes.splice(index, 1);
      } else {
        state.visibleTypes.push(type);
      }
    },
    setVisibleTypes: (state, action: PayloadAction<string[]>) => {
      state.visibleTypes = action.payload;
    },
    selectAllTypes: (state, action: PayloadAction<string[]>) => {
      state.visibleTypes = action.payload;
    },
    deselectAllTypes: (state) => {
      state.visibleTypes = [];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  toggleLocationType,
  setVisibleTypes,
  selectAllTypes,
  deselectAllTypes,
  setSearchQuery,
} = filtersSlice.actions;

export default filtersSlice.reducer;
