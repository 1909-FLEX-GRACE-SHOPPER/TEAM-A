import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderRadius: 2,
      alignContent: 'stretch',
      padding: '1rem 1rem',
      color: '#1F1F1F',
    },
    form: {
        margin: '1rem',
    },
    formElem: {
        marginBottom: '0.5rem',
    },
    error: {
        backgroundColor: '#FF9473',
    },
    header: {
        margin: '0 0 0.5rem 0',
    },
    p: {
        margin: '0 0 0.5rem 0'
    },
    centerHero: {
        width: '480px',
    }
});

export default useStyles;