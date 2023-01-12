const styles = {
  card: {
    maxWidth: 300,
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
  content: {
    textAlign: 'left',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'end',
  },
};
export default styles;
