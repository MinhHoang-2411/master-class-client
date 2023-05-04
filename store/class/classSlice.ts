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
  indexSelectedLesson: number;
  loadingSelectedLesson: boolean;
  authorName: string;
}

const initialState: ClassStateModel = {
  listData: [],
  listDataSearch: [],
  pagination: undefined,
  loading: false,
  loadingSearch: false,
  reloadList: false,
  indexSelectedLesson: 0,
  loadingSelectedLesson: false,
  authorName: '',
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

    setIndexSelectedLesson(state, action) {
      state.loadingSelectedLesson = true;
    },
    setIndexSelectedLessonSuccess(state, action) {
      state.indexSelectedLesson = action.payload;
      state.loadingSelectedLesson = false;
    },
    setIndexSelectedLessonFalse(state, action) {
      state.loadingSelectedLesson = false;
    },

    //authorName
    setAuthorName(state, action) {
      state.authorName = action.payload;
    },
  },
});

// Actions
export const classActions = classSlice.actions;

// Reducer
const classReducer = classSlice.reducer;
export default classReducer;
