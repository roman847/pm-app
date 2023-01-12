import axios, { AxiosError } from 'axios';
import {
  CreateTask,
  UpdateTask,
  GetTasks,
  ServerErrorResponse,
  DeleteTask,
} from 'core/interfaces/dataModels';

import { axiosInstance } from 'services/api';

import { Endpoint } from 'core/enums';

export const getTasks: Awaited<GetTasks> = async (boardId: string, columnId: string) => {
  try {
    const response = await axiosInstance.get(
      `${Endpoint.boards}/${boardId}${Endpoint.columns}/${columnId}${Endpoint.tasks}`
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

export const updateTask: Awaited<UpdateTask> = async (boardId, columnId, taskId, body) => {
  try {
    const response = await axiosInstance.put(
      `${Endpoint.boards}/${boardId}${Endpoint.columns}/${columnId}${Endpoint.tasks}/${taskId}`,
      body
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

export const deleteTask: Awaited<DeleteTask> = async (boardId, columnId, taskId) => {
  try {
    const response = await axiosInstance.delete(
      `${Endpoint.boards}/${boardId}${Endpoint.columns}/${columnId}${Endpoint.tasks}/${taskId}`
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

export const createTask: Awaited<CreateTask> = async ({
  boardId,
  columnId,
  title,
  description,
  order,
}) => {
  try {
    const response = await axiosInstance.post(
      `${Endpoint.boards}/${boardId}${Endpoint.columns}/${columnId}${Endpoint.tasks}`,
      { title: title, order: order, description: description, userId: 0, users: ['string'] }
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
