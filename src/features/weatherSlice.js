import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';



export const weatherSlice = createSlice({
    name: "weather",
    initialState:{
        data:{},
        locale: 'ar',
        unit: 'metric',
        city: 'Casablanca',
    },
    reducers:{
        language: (state, action) => {
            console.log("appelle de de reducer language", action.payload)
            state.locale = action.payload;
            console.log("langue dans Slice", state.locale)
        },
        unit: (state, action) => {
            state.unit = action.payload;
        },
        city: (state, action) => {
            state.city = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            console.log("fetching weather data...");
            state.data = {};
        })
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            console.log("weather data fetched successfully", action.payload); 
            state.data = action.payload;
           
        })
        builder.addCase(fetchWeather.rejected, (state) => {
            console.log("failed to fetch weather data");
            state.data = {};
        })

    }
})

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async ({ ville, locale, unite }) => {
        console.log("appel thunk fonction avec ",ville, locale, unite);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=aade230efd632809ec71052dcc8534bb&lang=${locale}&units=${unite}`;
        const response = await axios.get(url);
        return response.data;
    }
);

export const {language, unit, city} = weatherSlice.actions;

export default weatherSlice.reducer;