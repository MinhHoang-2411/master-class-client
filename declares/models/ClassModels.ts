import { PaginationParams } from './common';

export interface ClassModel {
  _id: string;
  name: string;
  categories: string[];
  title: string;
  thumbnail: string;
  authorName: string;
  createdAt?: string;
  deletedAt?: string;
  updatedAt?: string;
}

export interface ResponseGetClass {
  success?: boolean;
  message?: string;
  data: Array<ClassModel>;
  paginate: PaginationParams;
}

export interface ParamsGetListClass {
  page: number;
  limit: number;
  search?: string;
  categories?: string;
}
