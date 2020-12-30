import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'column',
  },
  actionBtn:{
    marginRight: 8,
    marginBottom: 16
  }
});

export default useStyles;