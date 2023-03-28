import { createSlice } from '@reduxjs/toolkit';

interface WatchingStateModel {
  loading: boolean;
  data: any;
  myWatching: any;
  myWatchingLoading: boolean;
  isFetchMore: boolean;
  totalPage: number;
}

const initialState: WatchingStateModel = {
  data: [],
  loading: false,
  myWatching: [],
  myWatchingLoading: false,
  isFetchMore: false,
  totalPage: 0,
};

const watchingSlice = createSlice({
  name: 'watching',
  initialState,
  reducers: {
    //
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
    //
    getMyWatching(state, action) {
      state.myWatchingLoading = true;
    },
    getMyWatchingSuccess(state, action) {
      state.myWatching = action.payload.data;
      state.totalPage = action.payload.paginate.total_page
      state.myWatchingLoading = false;
    },
    getMyWatchingFalse(state, action) {
      state.myWatchingLoading = false;
    },

    //
    onFetchMore(state, action) {
      state.isFetchMore = true;
    },
    onFetchMoreSuccess(state, action) {
      state.isFetchMore = false;
      state.myWatching = [...state.myWatching, ...action.payload];
    },
    onFetchMoreFalse(state, action) {
      state.isFetchMore = false;
    },
  },
});

// Actions
export const watchingActions = watchingSlice.actions;

// Reducer
const watchingReducer = watchingSlice.reducer;
export default watchingReducer;
