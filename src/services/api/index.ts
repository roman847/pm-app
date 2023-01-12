import axios, { AxiosError } from 'axios';
import { decode } from 'jsonwebtoken-esm';
import { Endpoint, LocalStorageItem } from 'core/enums';
import { localStorageService } from 'services/localStorageHelper';
import { ServerErrorResponse, SignInRequest, SignInResponse } from 'core/interfaces/dataModels';
import { isJwtPayload } from 'services/typeguards';
import { getUserInfoFromToken } from 'services/helpers';

export const getToken = () => {
  return localStorageService.get(LocalStorageItem.userToken);
};

export const saveToken = (token: LocalStorageItem) => {
  localStorageService.set(LocalStorageItem.userToken, token);
};

export const removeToken = () => {
  localStorageService.remove(LocalStorageItem.userToken);
};

export const isTokenExpired = () => {
  const token = getToken();
  if (!token) {
    removeToken();
    return true;
  }
  const decodedToken = decode(token, { complete: true });
  if (!decodedToken || !isJwtPayload(decodedToken.payload) || !decodedToken.payload.exp) {
    removeToken();
    return true;
  }
  const expirationTokenTimeMs = decodedToken.payload.exp * 1000;
  return expirationTokenTimeMs < Date.now();
};

export const isTokenValid = () => {
  const userInfo = getUserInfoFromToken();
  if (userInfo) {
    return getUserInfoFromToken().login === localStorageService.get(LocalStorageItem.userLogin);
  }
  return false;
};

const token = getToken();

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!config.headers) config.headers = {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.error(error)
);

export const signIn = async ({
  login,
  password,
}: SignInRequest): Promise<SignInResponse | ServerErrorResponse> => {
  try {
    const response = await axiosInstance.post(Endpoint.signIn, { login, password });
    saveToken(response.data.token);
    return response.data.token;
  } catch (error) {
    // eslint-disable-next-line import/no-named-as-default-member
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerErrorResponse>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { statusCode: 'unknown', message: 'Unknown error' };
  }
};
