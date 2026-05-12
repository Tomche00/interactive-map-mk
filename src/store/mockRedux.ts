// Temporary mock for Redux - remove after installing dependencies
import React from 'react';

export const Provider: React.FC<{ children: React.ReactNode; store: any }> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

export const useDispatch = () => () => {};
export const useSelector = <T>(selector: (state: any) => T) => selector({});

export const createAsyncThunk = () => () => {};
export const createSlice = () => ({
  reducer: {},
  actions: {},
  caseReducers: {},
});
export const configureStore = () => ({});
export const createApi = () => ({
  reducerPath: 'mock',
  reducer: {},
  middleware: [],
  endpoints: {},
});
