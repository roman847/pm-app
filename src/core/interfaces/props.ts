import { SelectChangeEvent } from '@mui/material';

import { AddButtonVariants, RemovedElementType, ScenarioModalCreate } from 'core/enums';

/**
 * Interface describes custom Header properties
 *
 * @interface
 */

export interface IHeaderProps {
  /**
   * Defines children
   */
  children?: React.ReactNode;
  /**
   * Defines scenario. It depends on page
   * @default 'homePage''
   */
  scenario: 'homePage' | 'mainPage';
}

/**
 * Interface describes custom SelectElement
 *
 * @interface
 */

export interface ISelectElementProps {
  /**
   * Defines children
   */
  children: React.ReactNode;
  /**
   * Defines options that renders in select option
   */
  options: Array<string>;
  /**
   * Defines select value. The controlled component
   */
  value: string;
  /**
   * This function is resolved on event onChange in the select
   * @param {SelectChangeEvent} e - Select event that could be handled
   */
  onChange: (e: SelectChangeEvent) => void;
}

/**

 * Interface describes custom AddButton element

 *
 * Interface describes StickyHeader props

 *
 * @interface
 */

export interface IAddButton {
  /**
   * Defines children
   */
  children?: React.ReactNode;
  /**
   * Defines button's text
   */
  variant: AddButtonVariants;
  clickHandler: () => void;
}
export interface IColumnItem {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}
export interface IColumnProps {
  titleColumn: string;
  orderColumn: number;
  columnId: string;
}
export interface StickyHeaderProps {
  children: React.ReactElement;
}

/**
 *
 * Interface describes properties for Protect routes
 *
 * @interface
 */
export interface PrivateRouteProps {
  /**
   * Defines boolean criteria that makes route available or not
   * True = route reachable, false = not reachable.
   */
  isLoggedIn: boolean;
  /**
   * Defines React element that would be available if access was provided.
   */
  children?: React.ReactElement;
}

// export interface ITaskItem {
//   _id: string;
//   title: string;
//   order: number;
//   boardId: string;
//   columnId: string;
//   description: string;
//   userId: string;
//   users: string[];
// }

export interface IModalTaskInfo {
  isOpened: boolean;
}

export interface IPropsModal {
  openNotification: boolean;
  handleClickModal: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text1: string;
  text2: string;
}

export interface IPropsBoardForm {
  headerDescription: string;
}

export interface IPropsObj {
  id: string | null;
  body: { title: string; owner: string; users: Array<string> };
}

export interface IModalCreate {
  scenario: ScenarioModalCreate;
  columnId?: string;
  order?: number;
}

export interface ISearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface ModalDeleteBoardProps {
  open: boolean;
  handleClose: () => void;
  boardId: string;
  columnId?: string;
  taskId?: string;
  type: RemovedElementType;
}
