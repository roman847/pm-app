import axios, { AxiosError } from 'axios';
import {
  CreateColumn,
  DeleteColumn,
  GetColumns,
  PutColumn,
  ServerErrorResponse,
} from 'core/interfaces/dataModels';
import { axiosInstance } from 'services/api';
import { Endpoint } from 'core/enums';

export const getColumns: Awaited<GetColumns> = async (boardId) => {
  try {
    const response = await axiosInstance.get(`${Endpoint.boards}/${boardId}${Endpoint.columns}`);

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

export const putColumn: Awaited<PutColumn> = async (boardId, columnId, body) => {
  const { title, order } = body;
  try {
    const response = await axiosInstance.put(
      `${Endpoint.boards}/${boardId}${Endpoint.columns}/${columnId}`,
      {
        title: title,
        order: order,
      }
    );
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

export const addColumn: Awaited<CreateColumn> = async ({ boardId, title, order }) => {
  try {
    const response = await axiosInstance.post(`${Endpoint.boards}/${boardId}${Endpoint.columns}`, {
      title: title,
      order: order,
    });
    console.log(response.data);
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

export const deleteColumn: Awaited<DeleteColumn> = async (boardId, columnId) => {
  try {
    const response = await axiosInstance.delete(
      `${Endpoint.boards}/${boardId}${Endpoint.columns}/${columnId}`
    );
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
