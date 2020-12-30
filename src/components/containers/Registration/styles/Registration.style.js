import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 360,
    alignItems: 'center',
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 24
  },
  form: { 
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  field: {
    width: '100%',
    paddingBottom: 16
  },
  submit: {
    marginTop: 24,
    marginBottom: 0,
    alignSelf: 'center'
  }
});

export default useStyles;