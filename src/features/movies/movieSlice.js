import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import {API_KEY} from '../../common/apis/movieApiKey' ;

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',
    async () => {
        const movieText = 'Avengers';
        const response = await movieApi.get(`?apiKey=${API_KEY}&s=${movieText}&type=movie`);
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows',
    async () => {
        const searchText = 'Friends';
        const response = await movieApi.get(`?apiKey=${API_KEY}&s=${searchText}&type=series`);
        return response.data;
    }
);

const initialState = {
    movies: {},
    shows: {},
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovies: (state, {payload}) => {
            state.movies = payload;
        },
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Fetched Movies Successfully!");
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected!");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Fetched Shows Successfully!");
            return { ...state, shows: payload };
        },
    },
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export default movieSlice.reducer;