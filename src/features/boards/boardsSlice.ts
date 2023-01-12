import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BoardPOSTRequest, IBoard, IForm } from 'core/interfaces/dataModels';
import { IPropsObj } from 'core/interfaces/props';
import { getBoards, createBoards, deleteBoards, updateBoards } from 'services/api/boards/index';

/**
 * Interface describes initialState
 *
 * @interface
 */

interface IInitialState {
  boards: IBoard[];
  status: string | null;
  error: string | null;
  currentBoard: string | null;
  editBoard: IForm;
  showForm: boolean;
  editForm: boolean;
}
const initialState: IInitialState = {
  boards: [],
  status: null,
  error: null,
  currentBoard: null,
  editBoard: { title: '', description: '' },
  showForm: false,
  editForm: false,
};

export const fetchBoards = createAsyncThunk<IBoard[], undefined, { rejectValue: string }>(
  'boards/fetchBoards',
  async function () {
    const response = await getBoards();
    return response;
  }
);

export const addBoard = createAsyncThunk<IBoard, BoardPOSTRequest, { rejectValue: string }>(
  'boards/addBoard',
  async function ({ title, owner, users }: BoardPOSTRequest) {
    const response = await createBoards({ title, owner, users });
    return response;
  }
);

export const deleteBoard = createAsyncThunk<string, string, { rejectValue: string }>(
  'boards/deleteBoard',
  async function (_id: string) {
    const response = await deleteBoards(_id);
    return response;
  }
);

export const updateBoard = createAsyncThunk<IBoard, IPropsObj, { rejectValue: string }>(
  'boards/updateBoard',
  async function (obj: IPropsObj) {
    const response = await updateBoards(obj);
    return response;
  }
);

const boardsReducer = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard: (state, { payload }) => {
      state.currentBoard = payload;
    },
    setShowForm: (state) => {
      state.showForm = !state.showForm;
    },
    setEditForm: (state) => {
      state.editForm = !state.editForm;
    },
    setEditBoardTitle: (state, { payload }) => {
      state.editBoard.title = payload;
    },
    setEditBoardDesc: (state, { payload }) => {
      state.editBoard.description = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchBoards.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.boards = payload;
    });
    builder.addCase(deleteBoard.fulfilled, (state, { payload }) => {
      state.boards = state.boards.filter(({ _id }) => _id !== payload);
    });
    builder.addCase(addBoard.fulfilled, (state, { payload }) => {
      state.boards.push(payload);
    });

    builder.addCase(updateBoard.fulfilled, (state, { payload }) => {
      state.boards = state.boards.map((obj) => (obj._id === state.currentBoard ? payload : obj));
    });
  },
});
export const { setCurrentBoard, setShowForm, setEditForm, setEditBoardTitle, setEditBoardDesc } =
  boardsReducer.actions;
export default boardsReducer.reducer;
