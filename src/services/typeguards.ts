import { JwtPayload } from 'jsonwebtoken-esm';
import { ServerErrorResponse, UserCreatedResponse } from 'core/interfaces/dataModels';

export const isUserCreatedResponse = (
  response: UserCreatedResponse | ServerErrorResponse
): response is UserCreatedResponse => {
  return (response as UserCreatedResponse)._id !== undefined;
};

export const isServerError = (
  response: ServerErrorResponse | unknown
): response is ServerErrorResponse => {
  return (
    (response as ServerErrorResponse).statusCode !== undefined &&
    (response as ServerErrorResponse).message !== undefined
  );
};

export const isJwtPayload = (payload?: JwtPayload | string | undefined): payload is JwtPayload => {
  return typeof payload === 'object';
};
