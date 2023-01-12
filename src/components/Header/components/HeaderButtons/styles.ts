import { Color } from 'core/enums';

const styles = {
  container: {
    display: 'flex',
    gap: '1rem',
  },
  exit: {
    cursor: 'pointer',
    transition: '0.3s ease-in-out',
    '&:hover': {
      fill: Color.pink,
    },
  },
};

export default styles;
