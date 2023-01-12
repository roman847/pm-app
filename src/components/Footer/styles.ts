import { Color } from 'core/enums';

const styles = {
  container: {
    width: '100%',
    top: 'auto',
    bottom: '0',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    color: Color.white,
  },
  namesContainer: {
    display: 'flex',
    gap: '2rem',
  },
  icon: {
    width: '7rem',
    height: '5rem',
    display: 'block',
  },
  year: {
    '&:hover': {
      cursor: 'default',
    },
  },
};

export default styles;
