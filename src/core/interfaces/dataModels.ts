import { IPropsObj } from 'core/interfaces/props';

export interface User {
  name: string;
  login: string;
  password: string;
}
export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface UserCreatedResponse {
  _id: string;
  name: string;
  login: string;
}

export interface ServerErrorResponse {
  statusCode: string;
  message: string;
}

export interface SignInResponse {
  token: string;
}

export type SignInRequest = Omit<User, 'name'>;
export type BoardPOSTRequest = Omit<IBoard, '_id'>;

export interface IColumnItem {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}
export interface UserInfoFromToken {
  id: string | null;
  login: string | null;
}

/**
 * Interface describes body`s request for changing column with endpoint columns/columnID
 * 
 @interface
 */

export interface IBodyInPutColumn {
  title: string;
  order: number;
}

/**
 * Type describes async function for get request with endpoint columns
 *
 * @type
 */

export type GetColumns = (boardID: string) => Promise<Array<IColumnItem>>;

/**
 * Type describes async function  put request for  updating column
 *
 * @type
 */

export type PutColumn = (
  /**
   * Defines boardId
   */
  boardId: string,
  /**
   * Defines columnId
   */
  columnId: string,
  /**
   * Defines body request
   */
  body: Required<IBodyInPutColumn>
) => Promise<Required<IColumnItem> | ServerErrorResponse>;

/**
 * Interface describes data response from get/put request  tasks
 *
 * @interface
 */

export interface ITaskItemData {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: number;
  boardId: string;
  columnId: string;
  users: Array<string>;
}

/**
 * Type describes async function for get request with endpoint /tasks
 *
 * @type
 */

export type GetTasks = (
  /**
   * Defines boardId
   */
  boardId: string,
  /**
   * Defines columnId
   */
  columnId: string
  /**
   * Defines body request
   */
) => Promise<Array<Required<ITaskItemData>>>;

/**
 * Type describes async function for update task
 *
 * @type
 */

export type UpdateTask = (
  /**
   * Defines boardId
   */
  boardId: string,
  /**
   * Defines columnId
   */
  columnId: string,
  /**
   * Defines taslId
   */
  taskId: string,
  /**
   * Defines body request
   */
  body: Omit<ITaskItemData, '_id' | 'boardId'>
) => Promise<Required<ITaskItemData> | ServerErrorResponse>;

export type DeleteTask = (boardId: string, columnId: string, taskId: string) => Promise<string>;

export interface IAddColumn {
  boardId: string | null;
  title: string;
  order: number;
}
export interface IAddTask {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  order: number;
}
export type CreateColumn = (
  requestOptions: IAddColumn
) => Promise<Omit<ITaskItemData, 'id' | 'boardId|'>>;

export type CreateTask = (requestOptions: IAddTask) => Promise<ITaskItemData>;

export type DeleteColumn = (boardId: string, columnId: string) => Promise<string>;

export interface DeleteFetchColumn {
  boardId: string;
  columnId: string;
}

export interface IForm {
  title: string;
  description: string;
}

export type GetBoards = () => Promise<Array<IBoard>>;
export type NewBoards = ({ title, owner, users }: BoardPOSTRequest) => Promise<IBoard>;
export type DeleteBoards = (_id: string) => Promise<string>;
export type UpdateBoards = (obj: IPropsObj) => Promise<IBoard>;
