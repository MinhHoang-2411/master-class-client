export interface ClassModel {
  _id: string;
  name: string;
  categories: string[];
  title: string;
  thumbnail: string;
  authorName: string;
}

export interface ResponseGetClass {
  success?: boolean;
  message?: string;
  data: Array<ClassModel>;
}
