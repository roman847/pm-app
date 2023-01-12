import axios, { AxiosError } from 'axios';
import { ServerErrorResponse, User, UserCreatedResponse } from 'core/interfaces/dataModels';
import { axiosInstance } from 'services/api';
import { Endpoint } from 'core/enums';

export const createUser = async ({
  name,
  login,
  password,
}: User): Promise<UserCreatedResponse | ServerErrorResponse> => {
  try {
    const response = await axiosInstance.post(Endpoint.signUp, { name, login, password });
    return response.data;
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
