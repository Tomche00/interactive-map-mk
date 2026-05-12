import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Location } from '@/types/location';

interface UIState {
  selectedLocation: Location | null;
  hoveredLocation: Location | null;
  tooltipPosition: { x: number; y: number } | null;
  sheetOpen: boolean;
}

const initialState: UIState = {
  selectedLocation: null,
  hoveredLocation: null,
  tooltipPosition: null,
  sheetOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    },
    setHoveredLocation: (state, action: PayloadAction<Location | null>) => {
      state.hoveredLocation = action.payload;
    },
    setTooltipPosition: (state, action: PayloadAction<{ x: number; y: number } | null>) => {
      state.tooltipPosition = action.payload;
    },
    setSheetOpen: (state, action: PayloadAction<boolean>) => {
      state.sheetOpen = action.payload;
    },
  },
});

export const {
  setSelectedLocation,
  setHoveredLocation,
  setTooltipPosition,
  setSheetOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
