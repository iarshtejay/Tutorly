import { createSlice } from '@reduxjs/toolkit';
import { getAllCourses, getEnrolledCourses } from '../services/courses-rest';

const initialState = {
    enrolledCourses: {
        loading: true,
        data: []
    },
    recommendedCourses: {
        loading: true,
        data: [],
    },
    archivedCourses: {
        loading: true,
        data: [],
    },
    allCourses: {
        loading: true,
        data: []
    },
    searchCourses: {
        loading: true,
        data: []
    }
};

export const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        updateSearchCourses: (state, action) => {
            console.log("ac", action.payload);
            state.searchCourses.data = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.allCourses.data = action.payload.data
            state.searchCourses.data = action.payload.data
            state.allCourses.loading = false
            state.searchCourses.loading = false
        });
        builder.addCase(getEnrolledCourses.fulfilled, (state, action) => {
            state.enrolledCourses.data = action.payload.data
            state.enrolledCourses.loading = false
        });
    }
});

export const { updateSearchCourses } = courseSlice.actions;

export default courseSlice.reducer;