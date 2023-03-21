import { PaginationParams } from '@/declares/models';
import { ClassModel } from '@/declares/models/ClassModels';
import { createSlice } from '@reduxjs/toolkit';

interface ClassStateModel {
  listData: Array<ClassModel>;
  listDataSearch: Array<ClassModel>;
  pagination: PaginationParams | undefined;
  loading: boolean;
  loadingSearch: boolean;
  reloadList: boolean;
}

const initialState: ClassStateModel = {
  listData: [],
  listDataSearch: [],
  pagination: undefined,
  loading: false,
  loadingSearch: false,
  reloadList: false,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    fetchData(state, action) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.listData = action.payload;
      state.loading = false;
    },
    fetchDataFalse(state, action) {
      console.error(action.payload);
      state.loading = false;
    },

    fetchDataSearch(state, action) {
      state.loadingSearch = true;
    },
    fetchDataSearchSuccess(state, action) {
      state.listDataSearch = action.payload;
      state.loadingSearch = false;
    },
    fetchDataSearchFalse(state, action) {
      state.loadingSearch = false;
    },
  },
});

// Actions
export const classActions = classSlice.actions;

// Reducer
const classReducer = classSlice.reducer;
export default classReducer;
