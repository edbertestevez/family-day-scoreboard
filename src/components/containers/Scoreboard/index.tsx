import { Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { get_tally } from "../../../api/scoreboard";
import useStyles from "./styles/Scoreboard.style";
import Tabulation from "./Tabulation";

export default function Scoreboard() {
  const classes = useStyles();

  const [tally, setTally] = useState({
    red: 0,
    blue: 0,
    yellow: 0,
  });

  const reloadTally = () => {
    const getPoints = (data: any, teamId: number) => {
      let points = 0;
      let filtered = data.filter((i: any) => i.teamId === teamId);
      if (filtered.length > 0) {
        points = filtered[0].points;
      }
      return points;
    };

    get_tally().then((response) => {
      setTally({
        red: getPoints(response, 1),
        blue: getPoints(response, 2),
        yellow: getPoints(response, 3),
      });
    });
  };

  useEffect(() => {
    reloadTally();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.tally}>
        <h1 style={{margin: 0, paddingTop: 8}}>SCORE BOARD</h1>
        <div className={classes.highlight}>
          <Card className={classes.highlightCard} style={{ backgroundColor: "#B40000" }}>
            <h4 className={classes.highlightScore}>{tally.red}</h4>
          </Card>
          <Card className={classes.highlightCard} style={{ backgroundColor: "#0044C8" }}>
            <h4 className={classes.highlightScore}>{tally.blue}</h4>
          </Card>
          <Card className={classes.highlightCard} style={{ backgroundColor: "#C8C000" }}>
            <h4 className={classes.highlightScore}>{tally.yellow}</h4>
          </Card>
        </div>
      </div>

      <Tabulation reloadTally={reloadTally} />
    </div>
  );
}
