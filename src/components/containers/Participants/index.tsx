import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import { get_members, generate_teams } from "../../../api/participants";
import { IParticipant } from "../../../types/Participants";
import AssignLeader from "./AssignLeader";
import ParticipantsList from "./ParticipantsList";
import useStyles from "./styles/Participants.styles";
import Teams from "./Teams";

export default function Participants() {
  const classes = useStyles();

  const [showListModal, setShowListModal] = useState(false);
  const [showLeaderModal, setShowLeaderModal] = useState(false);

  const [members, setMembers] = useState<{
    red: Array<IParticipant>;
    blue: Array<IParticipant>;
    yellow: Array<IParticipant>;
    noTeam: Array<IParticipant>;
  }>({
    red: [],
    blue: [],
    yellow: [],
    noTeam: [],
  });

  const triggerShuffle = () => {
    generate_teams().then((response) => {
      filterMembers(response);
    });
  };

  const filterMembers = (response: Array<IParticipant>) => {
    let redMembers = response.filter((i: IParticipant) => i.teamId === 1);
    let blueMembers = response.filter((i: IParticipant) => i.teamId === 2);
    let yellowMembers = response.filter((i: IParticipant) => i.teamId === 3);
    let noTeam = response.filter((i: IParticipant) => i.teamId === null);

    setMembers({
      red: redMembers,
      blue: blueMembers,
      yellow: yellowMembers,
      noTeam: noTeam,
    });
  };

  const toggleListModal = () => {
    setShowListModal(!showListModal);
  };

  const toggleLeaderModal = () => {
    setShowLeaderModal(!showLeaderModal);
  };

  useEffect(() => {
    get_members().then((response) => {
      filterMembers(response);
    });
  }, []);

  return (
    <div className={classes.container}>
      <h2>PARTICIPANTS ({members.red.length + members.blue.length + members.yellow.length + members.noTeam.length})</h2>
      <div>
        <Button onClick={toggleListModal} className={classes.actionBtn} variant="contained" color="secondary">
          View All Participants
        </Button>

        <Button onClick={toggleLeaderModal} className={classes.actionBtn} variant="contained" color="secondary">
          Assign Leaders
        </Button>

        <Button onClick={triggerShuffle} className={classes.actionBtn} variant="contained" color="secondary">
          Shuffle Members
        </Button>
      </div>

      <Teams members={members} />

      <ParticipantsList visible={showListModal} onCloseModal={toggleListModal} />
      <AssignLeader visible={showLeaderModal} onCloseModal={toggleLeaderModal} />
    </div>
  );
}
