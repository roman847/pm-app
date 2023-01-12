import { pxToRem } from 'services/helpers';
import { Color } from 'core/enums';
import { font } from 'shared/styles/fonts';

export const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    background: Color.lightPink,
  },
  form: {
    width: pxToRem(375),
    padding: '2rem',
    background: Color.white,
    borderRadius: '1rem',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
  },
  formHeader: {
    textAlign: 'center',
    paddingBottom: '1rem',
    ...font,
  },
  inputField: {
    paddingBottom: '1rem',
  },
  input: {
    width: '100%',
  },
  button: {
    margin: '0 auto',
  },
  error: {
    paddingBottom: '0.5rem',
  },
  errorMessage: {
    color: Color.red,
    paddingBottom: '0.5rem',
  },
  serverErrorMessage: {
    color: Color.red,
    paddingTop: '1rem',
    textAlign: 'center',
  },
  divider: {
    paddingTop: '1rem',
  },
  helperText: {
    textAlign: 'center',
    paddingTop: '1rem',
  },
};
