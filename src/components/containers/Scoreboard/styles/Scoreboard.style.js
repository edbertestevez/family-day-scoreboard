import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "column",
  },
  tally: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  },
  highlight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
  },
  highlightCard: {
    width: 200,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    
  },
  highlightScore: {
    color: "white",
    fontSize: 50,
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
});

export default useStyles;
