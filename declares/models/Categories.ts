export interface CategoryModel {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  priority: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResponseGetCate {
  success?: boolean;
  message?: string;
  data: Array<CategoryModel>;
}
