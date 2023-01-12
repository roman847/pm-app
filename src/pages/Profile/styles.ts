import { Color } from 'core/enums';
import { pxToRem } from 'services/helpers';

const styles = {
  wrapper: {
    background: Color.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
    paddingBottom: '2rem',
    flexGrow: '1',
  },
  profile: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    width: pxToRem(700),
    margin: 'auto',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  },
  button: {
    '&:hover': {
      transform: 'scale(1.1)',
      border: ' 1px solid blue',
    },
    width: '10px',
  },
  media: {
    paddingTop: '56.25%',
  },
  name: { textAlign: 'center' },
  content: {
    textAlign: 'left',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'end',
  },
};
export default styles;
