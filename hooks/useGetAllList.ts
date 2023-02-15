import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect } from 'react';

interface ParamsModel {
  [key: string]: any;
}

export default function useGetAllList(
  action: {
    fetchData: any;
  },
  nameState: string,
  params?: ParamsModel
) {
  const dispatch = useAppDispatch();
  const { listData, pagination, reloadList, loading } = useAppSelector(
    (state) => (state as any)[nameState]
  );

  const fetchData = useCallback((params: ParamsModel) => {
    try {
      const paramsApi = { ...params };
      dispatch(action.fetchData(paramsApi || {}));
    } catch (error) {
      console.error({ error });
    }
  }, []);

  useEffect(() => {
    fetchData(params as ParamsModel);
  }, [params, reloadList]);

  return { listData, pagination, loading };
}
