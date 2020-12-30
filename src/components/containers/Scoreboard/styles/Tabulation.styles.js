import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  headers: {
    marginTop: 20,
    paddingLeft: 16,
    height: 60,
    backgroundColor: "#ffd8d8",
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  resultColumn:{
    textAlign: 'center',
    justifyContent: 'center',
  },
  rowData: {
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 4,
    borderBottomColor: "#cacaca",
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 24
  },
  editInput: {
    fontSize: 24,
    textAlign: 'center'
  }
});

export default useStyles;