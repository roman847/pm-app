import { decode } from 'jsonwebtoken-esm';
import { localStorageService } from 'services/localStorageHelper';
import { LocalStorageItem } from 'core/enums';
import { isJwtPayload } from 'services/typeguards';
import { IColumnItem, UserInfoFromToken } from 'core/interfaces/dataModels';

export const pxToRem = (pixels: number) => {
  return `${pixels / 16}rem`;
};

export const removeToken = () => localStorageService.remove(LocalStorageItem.userToken);
export const removeUserLogin = () => localStorageService.remove(LocalStorageItem.userLogin);

export const getUserInfoFromToken = (): UserInfoFromToken => {
  const token = localStorageService.get(LocalStorageItem.userToken);
  const decodedToken = decode(token, { complete: true });
  if (
    !decodedToken ||
    !isJwtPayload(decodedToken.payload) ||
    !decodedToken.payload ||
    !decodedToken.payload.login ||
    !decodedToken.payload.id
  ) {
    return { id: null, login: null };
  }
  return { id: decodedToken.payload.id, login: decodedToken.payload.login };
};

export const sortOrder = (a: IColumnItem, b: IColumnItem) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
};

// export const identifyOrder = (columns: IColumnItem[]) => {
//   columns.reduce((acc: IColumnItem, item: IColumnItem, index: number): IColumnItem => {
//     if()
//     console.log(item);
//   });
// };
