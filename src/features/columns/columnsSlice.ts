import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteFetchColumn, IAddColumn, IColumnItem } from 'core/interfaces/dataModels';
import { addColumn, deleteColumn, getColumns } from 'services/api/columns/index';
import { StateStatus } from 'core/enums';

interface IInitialState {
  columns: IColumnItem[];
  orderInit: number;
  status: StateStatus;
  currentColumn: IColumnItem;
  createColumn: Omit<IColumnItem, '_id' | 'boardId'>;
}

export const fetchColumns = createAsyncThunk<IColumnItem[], string, { rejectValue: string }>(
  'columns/fetchColumns',
  async function (boardId: string) {
    const response = getColumns(boardId);
    return response;
  }
);

export const createFetchColumn = createAsyncThunk<IColumnItem, IAddColumn, { rejectValue: string }>(
  'columns/addColumn',
  async function ({ boardId, title, order }) {
    const response = addColumn({ boardId, title, order });
    return response;
  }
);

export const deleteFetchColumn = createAsyncThunk<
  string,
  DeleteFetchColumn,
  { rejectValue: string }
>('columns/deleteColumn', async function ({ boardId, columnId }) {
  const response = await deleteColumn(boardId, columnId);
  return response;
});

const initialState: IInitialState = {
  columns: [],
  orderInit: 0,
  status: StateStatus.loading,
  currentColumn: {
    _id: '',
    title: '',
    order: 0,
    boardId: '',
  },
  createColumn: {
    title: '',
    order: 0,
  },
};

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setCurrentColumn(state, { payload }) {
      state.currentColumn = payload;
    },
    setCreateColumn(state, { payload }) {
      state.createColumn = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.status = StateStatus.loading;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.status = StateStatus.resolved;
      })
      .addCase(fetchColumns.rejected, (state) => {
        state.status = StateStatus.rejected;
        throw new Error('Error');
      })
      .addCase(createFetchColumn.pending, (state) => {
        state.status = StateStatus.loading;
      })
      .addCase(createFetchColumn.fulfilled, (state, action) => {
        state.status = StateStatus.resolved;
        state.columns = [...state.columns, action.payload];
      })
      .addCase(createFetchColumn.rejected, (state) => {
        state.status = StateStatus.rejected;
        throw new Error('Error');
      })
      .addCase(deleteFetchColumn.fulfilled, (state, { payload }) => {
        state.columns = state.columns.filter(({ _id }) => _id !== payload);
      });
  },
});

export const { setCurrentColumn, setCreateColumn } = columnSlice.actions;
export default columnSlice.reducer;
