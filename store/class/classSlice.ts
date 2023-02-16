import { PaginationParams } from '@/declares/models';
import { ClassModel } from '@/declares/models/ClassModels';
import { createSlice } from '@reduxjs/toolkit';

interface ClassStateModel {
  listData: Array<ClassModel>;
  pagination: PaginationParams | undefined;
  loading: boolean;
  reloadList: boolean;
}

const initialState: ClassStateModel = {
  listData: [],
  pagination: undefined,
  loading: false,
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
  },
});

// Actions
export const classActions = classSlice.actions;

// Reducer
const classReducer = classSlice.reducer;
export default classReducer;
