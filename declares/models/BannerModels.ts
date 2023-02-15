export interface BannerModel {
  _id: string;
  name?: string;
  title?: string;
  description?: string;
  isActive: boolean;
  images: string[];
}

export interface ResponseGetBanner {
  success?: boolean;
  message?: string;
  data: BannerModel;
}
