import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LangList, LocalStorageItem } from 'core/enums';
import { localStorageService } from 'services/localStorageHelper';
import { isTokenExpired, isTokenValid } from 'services/api';
import { getUserInfoFromToken } from 'services/helpers';

/**
 * Interface describes initialState
 *
 * @interface
 */

interface IInitialState {
  /**
   * Defines lang. It can be LangList`s value
   * @default 'LangList.russian''
   */
  lang: LangList;
  /**
   * Defines user login.
   */
  userLogin: string | null;
  /**
   * Defines would user have access to private routes or not.
   */
  isLoggedIn: boolean;
  /**
   * Defines user id
   */
  userId: string | null;
  /**
   * Defines loading status for application.
   */
  isLoading: boolean;
}

const initialState: IInitialState = {
  lang: localStorageService.get(LocalStorageItem.language) || LangList.english,
  userLogin: localStorageService.get(LocalStorageItem.userLogin),
  isLoggedIn: !isTokenExpired() && isTokenValid(),
  userId: getUserInfoFromToken().id,
  isLoading: false,
};

const appSlice = createSlice({
  name: 'Language',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
      localStorageService.set(LocalStorageItem.language, action.payload);
    },
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
      localStorageService.set(LocalStorageItem.userLogin, action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLang, setUserLogin, setUserId, setIsLoggedIn, setLoadingStatus } =
  appSlice.actions;
export default appSlice.reducer;
