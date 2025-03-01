export interface IApiResponse<T> {
  success: boolean;
  data: T;
}

export interface IInfoData {
  info: string;
}

export interface ILoginData {
  token: string;
}
