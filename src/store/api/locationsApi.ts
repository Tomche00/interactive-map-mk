import { createApi } from '@reduxjs/toolkit/query/react';
import type { Location } from '@/types/location';
import locationsData from '@/data/locations.json';

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return { data: locationsData };
  },
  tagTypes: ['Location'],
  endpoints: (builder) => ({
    getLocations: builder.query<Location[], void>({
      query: () => '',
      providesTags: ['Location'],
    }),
    getLocationById: builder.query<Location, string>({
      query: (id) => id,
      providesTags: (result, error, id) => [{ type: 'Location', id }],
    }),
    getLocationsByType: builder.query<Location[], string>({
      query: (type) => type,
      providesTags: ['Location'],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  useGetLocationsByTypeQuery,
} = locationsApi;
