import axios, { AxiosError } from 'axios';
import {
  BoardPOSTRequest,
  GetBoards,
  ServerErrorResponse,
  NewBoards,
  DeleteBoards,
  UpdateBoards,
} from 'core/interfaces/dataModels';
import { axiosInstance } from 'services/api';
import { Endpoint } from 'core/enums';
import { IPropsObj } from 'core/interfaces/props';

export const getBoards: Awaited<GetBoards> = async () => {
  try {
    const response = await axiosInstance.get(Endpoint.boards);
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

export const createBoards: Awaited<NewBoards> = async ({
  title,
  owner,
  users,
}: BoardPOSTRequest) => {
  try {
    const response = await axiosInstance.post(Endpoint.boards, { title, owner, users });
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

export const deleteBoards: Awaited<DeleteBoards> = async (_id: string) => {
  try {
    const response = await axiosInstance.delete(`${Endpoint.boards}/${_id}`);
    return response.data._id;
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

export const updateBoards: Awaited<UpdateBoards> = async (obj: IPropsObj) => {
  const { body, id } = obj;
  try {
    const response = await axiosInstance.put(`${Endpoint.boards}/${id}`, {
      title: body.title,
      owner: body.owner,
      users: body.users,
    });
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
