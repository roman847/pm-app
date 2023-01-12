import { Color } from 'core/enums';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  window: {
    width: '25rem',
    height: '20rem',
    background: Color.lightPink,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    borderRadius: '2.5rem',
  },
  title: {
    textAlign: 'center',
    paddingBottom: '5rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    gap: '2rem',
  },
};

export default styles;
