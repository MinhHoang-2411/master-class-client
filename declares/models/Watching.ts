export interface WatchingModel {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  isActive: boolean;
  images: string[];
}

export interface ResponseGetWatching {
  success?: boolean;
  message?: string;
  data: WatchingModel;
}

export interface WatchingPayload {
  lessonId: string;
  secondLastView: number;
  isFinished: number;
}
