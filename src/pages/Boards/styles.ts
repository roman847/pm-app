import { Color } from 'core/enums';

const styles = {
  boards: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  wrapper: {
    background: Color.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '2rem',
    paddingTop: '100px',
    paddingBottom: '2rem',
    flexGrow: '1',
  },
};
export default styles;
