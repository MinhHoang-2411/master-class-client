import { PaginationParams } from '@/declares/models';
import { CategoryModel } from '@/declares/models/Categories';
import { createSlice } from '@reduxjs/toolkit';

interface CategoriesModel {
  listData: Array<CategoryModel>;
  pagination: PaginationParams | undefined;
  loading: boolean;
  reloadList: boolean;
}

const initialState: CategoriesModel = {
  listData: [],
  pagination: undefined,
  loading: false,
  reloadList: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
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
export const categoriesActions = categoriesSlice.actions;

// Reducer
const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
