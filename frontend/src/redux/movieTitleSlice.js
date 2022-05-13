import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getAllMovieTitles = createAsyncThunk(
    'titles/getAllMovieTitles',
    async(obj,{rejectWithValue}) => {
        try {
            const response = await axios.get('/api/v1/movies/all/titles');
            return response.data.titles
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }

)

const initialState = {
    titles: [],
    isLoading : false,
    errors: null,
}

const movieTitleSlice = createSlice({
    name: 'title',
    initialState,
    extraReducers : {
        [getAllMovieTitles.pending] : (state) => {
            state.isLoading = true
        },
        [getAllMovieTitles.fulfilled] : (state,action) => {
            // state.titles = action.payload
            const titles = [];
            action.payload.reduce((obj,item) => {
                return titles.push({"title": item})
            })
            state.titles = titles
            state.isLoading = false
        },
        [getAllMovieTitles.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        }
    }
})


export default movieTitleSlice.reducer