import { FormInput } from 'core/enums';

export type FormInputType = Record<FormInput, FormInput>;
export type FormDataInputType = {
  title: string;
  owner: string;
  users: string[];
};
