import { createSlice } from "@reduxjs/toolkit";

const currentVideoSlice = createSlice({
  name: "currentVideo",
  initialState: {
    videoData: null,
    userHistory: [], // Store the user's history
  },
  reducers: {
    setVideoData: (state, action) => {
      state.videoData = action.payload;
    },
    clearVideoData: (state) => {
      state.videoData = null;
    },
    setUserHistory: (state, action) => {
      state.userHistory = action.payload; // Reverse the array when setting it
    },
    clearUserHistory: (state) => {
      state.userHistory = []; // Clear the history
    },
    addToUserHistory: (state, action) => {
      state.userHistory.unshift(action.payload); // Add new video to the beginning
    },
  },
});

export const {
  setVideoData,
  clearVideoData,
  setUserHistory,
  clearUserHistory,
  addToUserHistory,
} = currentVideoSlice.actions;

export default currentVideoSlice.reducer;
