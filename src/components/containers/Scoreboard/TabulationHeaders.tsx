import React from "react";
import useStyles from "./styles/Tabulation.styles";
import Grid from "@material-ui/core/Grid";

export default function TabulationHeaders() {
  const classes = useStyles();

  return (
    <Grid container className={classes.headers}>
      <Grid item xs={2}>Games</Grid>
      <Grid item xs={3} className={classes.resultColumn}>RED TEAM</Grid>
      <Grid item xs={3} className={classes.resultColumn}>BLUE TEAM</Grid>
      <Grid item xs={3} className={classes.resultColumn}>YELLOW TEAM</Grid>
      <Grid item xs={1} className={classes.resultColumn}>Action</Grid>
    </Grid>
  );
}
