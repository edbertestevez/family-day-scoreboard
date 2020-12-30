import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles/Teams.style";
import { Divider } from "@material-ui/core";
import { IParticipant } from "../../../types/Participants";

interface IProps {
  members: {
    red: Array<IParticipant>;
    blue: Array<IParticipant>;
    yellow: Array<IParticipant>;
  };
}

const Teams: React.FC<IProps> = ({members}) => {
  const classes = useStyles();

  enum Teams {
    RED = "red",
    BLUE = "blue",
    YELLOW = "yellow",
  }

  const renderData = (team: Teams) => {
    return members[team].map((member: IParticipant) => {
      if(member.participantId === member.leaderId){
        return;
      }

      return (
        <h3 key={member.participantId} className={classes.memberInfo}>
          {member.lastName}, {member.firstName}
        </h3>
      );
    });
  };

  const renderLeader = (team: Teams) => {
    let leaderData = members[team].filter(member => member.participantId === member.leaderId);

    if(leaderData.length > 0){
      return leaderData[0].lastName + ", " + leaderData[0].firstName;
    }else{
      return "None";
    }
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className={classes.grid}>
            <h1 style={{ color: "#B40000", marginBottom: 0 }}>RED TEAM</h1>
            <h3 className={classes.memberInfo}>(Leader) {renderLeader(Teams.RED)}</h3>
            <Divider />
            {renderData(Teams.RED)}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.grid}>
            <h1 style={{ color: "#0044C8", marginBottom: 0 }}>BLUE TEAM</h1>
            <h3 className={classes.memberInfo}>(Leader) {renderLeader(Teams.BLUE)}</h3>
            <Divider />
            {renderData(Teams.BLUE)}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.grid}>
            <h1 style={{ color: "#C8C000", marginBottom: 0 }}>YELLOW TEAM</h1>
            <h3 className={classes.memberInfo}>(Leader) {renderLeader(Teams.YELLOW)}</h3>
            <Divider />
            {renderData(Teams.YELLOW)}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Teams;