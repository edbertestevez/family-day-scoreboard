import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    height: '80%'
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  modalContent:{
    flexDirection: 'column',
    width: '70%',
    marginTop: 30,
    marginBottom: 30,
    padding: 20
  },
  modalContentSmall:{
    flexDirection: 'column',
    width: '30%',
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    height: 300
  },
  tableContainer: {
    marginTop: 16,
    maxHeight: '90%'
  },
  field: {
    marginBottom: 20
  }
});

export default useStyles;