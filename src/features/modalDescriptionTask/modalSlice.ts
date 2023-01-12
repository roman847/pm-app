import { createSlice } from '@reduxjs/toolkit';
import { ITaskItemData } from 'core/interfaces/dataModels';

/**
 * Interface describes initialState
 *
 * @interface
 */

interface IInitialState {
  /**
   * Defines which of tasks has been clicked
   *
   */
  task: ITaskItemData;
  isOpened: boolean;
}

const initialState: IInitialState = {
  task: {
    _id: '',
    title: '',
    order: 0,
    boardId: '',
    columnId: '',
    description: '',
    userId: 0,
    users: [''],
  },
  isOpened: false,
};

const modalDescriptionTaskSlice = createSlice({
  name: 'ModalDescriptionTask',
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setOpen: (state, action) => {
      state.isOpened = action.payload;
    },
  },
});

export const { setTask, setOpen } = modalDescriptionTaskSlice.actions;
export default modalDescriptionTaskSlice.reducer;
