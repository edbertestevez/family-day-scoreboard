import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  memberInfo: {
    marginTop: 0
  }
});

export default useStyles;