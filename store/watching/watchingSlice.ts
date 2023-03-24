import { createSlice } from '@reduxjs/toolkit';

interface WatchingStateModel {
  loading: boolean;
  data: any;
}

const initialState: WatchingStateModel = {
  data: [],
  loading: false,
};

const watchingSlice = createSlice({
  name: 'watching',
  initialState,
  reducers: {
    handleCreateAndUpdateMyWatching(state, action) {
      state.loading = true;
    },
    handleCreateAndUpdateMyWatchingSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    handleCreateAndUpdateMyWatchingFalse(state, action) {
      state.loading = false;
    },
  },
});

// Actions
export const watchingActions = watchingSlice.actions;

// Reducer
const watchingReducer = watchingSlice.reducer;
export default watchingReducer;
