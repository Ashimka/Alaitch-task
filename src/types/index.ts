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

export interface IRequestAuth {
  email: string;
  password: string;
}

export interface ILogoutData {
  data: Record<string, unknown>;
}

export interface IProfileData {
  fullname: string;
  email: string;
  avatar?: string;
}
