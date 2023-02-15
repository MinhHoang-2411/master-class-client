import { BannerModel, PaginationParams } from '@/declares/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomePageModel {
  listData: BannerModel | undefined;
  pagination: PaginationParams | undefined;
  loading: boolean;
  reloadList: boolean;
}

const initialState: HomePageModel = {
  listData: undefined,
  pagination: undefined,
  loading: false,
  reloadList: false,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    fetchData(state, action) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.listData = action.payload.data;
      state.loading = false;
    },
    fetchDataFalse(state, action) {
      console.error(action.payload);
      state.loading = false;
    },
  },
});

// Actions
export const homePageActions = homePageSlice.actions;

// Reducer
const homePageReducer = homePageSlice.reducer;
export default homePageReducer;
