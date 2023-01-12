import { pxToRem } from 'services/helpers';
import { Color } from 'core/enums';
import { font } from 'shared/styles/fonts';

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    background: Color.lightPink,
  },
  modal: {
    minHeight: pxToRem(200),
    padding: '1rem',
    flexDirection: 'column',
    background: Color.white,
    borderRadius: '1rem',
    boxShadow: '0 1rem 40px rgb(0 0 0 / 50%);',
  },
  form: {
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    borderRadius: '1rem',
    padding: '2rem 1rem',
    boxShadow: '0 0 1rem rgb(0 0 0 / 10%)',
    borderColor: Color.gray,
  },
  formHeader: {
    textAlign: 'center',
    paddingBottom: '1rem',
    ...font,
  },
  inputField: {
    paddingBottom: '1rem',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
  },
  btnConfirm: {
    backgroundColor: Color.confirm,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: Color.black,
    textTransform: 'none',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: Color.confirmHover,
    },
  },

  btnCancel: {
    backgroundColor: Color.cancel,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: Color.black,
    textTransform: 'none',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: Color.cancelHover,
    },
  },
};
export default styles;
