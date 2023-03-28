import { createSlice } from '@reduxjs/toolkit';

interface WatchingStateModel {
  loading: boolean;
  data: any;
  myWatching: any;
  myWatchingLoading: boolean;
}

const initialState: WatchingStateModel = {
  data: [],
  loading: false,
  myWatching: [],
  myWatchingLoading: false,
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
    getMyWatching(state, action) {
      state.myWatchingLoading = true;
    },
    getMyWatchingSuccess(state, action) {
      state.myWatching = action.payload;
      state.myWatchingLoading = false;
    },
    getMyWatchingFalse(state, action) {
      state.myWatchingLoading = false;
    },
  },
});

// Actions
export const watchingActions = watchingSlice.actions;

// Reducer
const watchingReducer = watchingSlice.reducer;
export default watchingReducer;
