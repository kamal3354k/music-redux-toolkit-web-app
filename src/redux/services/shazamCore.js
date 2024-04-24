import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "c3077007f8mshd68ba080623a402p12ccc2jsn0da79bb637f9" //kamal3354k.gmail.com
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopChart: builder.query({ query: () => "/v1/charts/world" }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/v1/tracks/details?track_id=${songid}`,
    }),
    getArtistRelated: builder.query({
      query: ({ songid }) => `/v1/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistid) => `/v2/artists/details?artist_id=${artistid}`,
    }),
    getSongByCountry: builder.query({
      query: (countryCode) => `/v1/charts/country?country_code=${countryCode}`,
    }),
    getSongByGenre: builder.query({
      query: (genreCode) => `/v1/charts/genre-world?genre_code=${genreCode}`,
    }),
    getSongBySearch: builder.query({
      query: (searchTerm) => `/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartQuery,
  useGetSongDetailsQuery,
  useGetArtistRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongByCountryQuery,
  useGetSongByGenreQuery,
  useGetSongBySearchQuery
} = shazamCoreApi;

// https://rapidapi.com/tipsters/api/shazam-core/
