import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import useStyles from "./styles/Modal.style";
import { IParticipant } from "../../../types/Participants";
import Button from "@material-ui/core/Button";
import { assign_leader, get_members } from "../../../api/participants";
import { isNullEmptyOrUndefined } from "../../../utils/common";

interface IProps {
  visible: boolean;
  onCloseModal: () => void;
}

const AssignLeader: React.FC<IProps> = ({ visible, onCloseModal }) => {
  const classes = useStyles();
  const [selection, setSelection] = useState<Array<IParticipant>>([]);
  const [redLeader, setRedLeader] = useState<number>(0);
  const [blueLeader, setBlueLeader] = useState<number>(0);
  const [yellowLeader, setYellowLeader] = useState<number>(0);

  useEffect(() => {
    get_members().then((response) => {
      let prevRedLeader: Array<IParticipant> = response.filter(
        (i: IParticipant) => i.leaderId === i.participantId && i.teamId === 1
      );
      let prevBlueLeader: Array<IParticipant> = response.filter(
        (i: IParticipant) => i.leaderId === i.participantId && i.teamId === 2
      );
      let prevYellowLeader: Array<IParticipant> = response.filter(
        (i: IParticipant) => i.leaderId === i.participantId && i.teamId === 3
      );

      if (prevRedLeader.length > 0) {
        console.log(prevRedLeader[0].participantId);
        setRedLeader(prevRedLeader[0].participantId);
      }

      if (prevBlueLeader.length > 0) {
        setBlueLeader(prevBlueLeader[0].participantId);
      }

      if (prevYellowLeader.length > 0) {
        setYellowLeader(prevYellowLeader[0].participantId);
      }

      setSelection(response);
    });
  }, [setSelection]);

  const renderSelection = () => {
    // let filteredSelection: Array<IParticipant> = selection.filter(
    //   (item: IParticipant) =>
    //     item.participantId !== redLeader && item.participantId !== blueLeader && item.participantId !== yellowLeader
    // );

    return selection.map((item: IParticipant) => {
      return (
        <MenuItem key={item.participantId} value={item.participantId}>
          {item.lastName}, {item.firstName}
        </MenuItem>
      );
    });
  };

  const onSaveChanges = () =>{
    if(!isNullEmptyOrUndefined(redLeader)){
      assign_leader(redLeader, 1);
    }

    if(!isNullEmptyOrUndefined(blueLeader)){
      assign_leader(blueLeader, 2);
    }

    if(!isNullEmptyOrUndefined(yellowLeader)){
      assign_leader(yellowLeader, 3);
    }

    setTimeout(()=>{
      window.location.reload();
    }, 1000)
  }

  return (
    <Modal
      open={visible}
      onClose={onCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.container}
    >
      <Paper className={classes.modalContentSmall}>
        <FormControl fullWidth className={classes.field}>
          <InputLabel id="select-red">RED TEAM Leader</InputLabel>
          <Select
            labelId="select-red"
            name="leader-red"
            value={redLeader}
            fullWidth
            onChange={(event: any) => setRedLeader(event.target.value)}
          >
            {renderSelection()}
          </Select>
        </FormControl>

        <FormControl fullWidth className={classes.field}>
          <InputLabel id="select-blue">BLUE TEAM Leader</InputLabel>
          <Select
            labelId="select-blue"
            name="leader-blue"
            value={blueLeader}
            fullWidth
            onChange={(event: any) => setBlueLeader(event.target.value)}
          >
            {renderSelection()}
          </Select>
        </FormControl>

        <FormControl fullWidth className={classes.field}>
          <InputLabel id="select-yellow">YELLOW TEAM Leader</InputLabel>
          <Select
            labelId="select-yellow"
            name="leader-yellow"
            value={yellowLeader}
            fullWidth
            onChange={(event: any) => setYellowLeader(event.target.value)}
          >
            {renderSelection()}
          </Select>
        </FormControl>

        <Button onClick={onSaveChanges} style={{alignSelf: 'center'}} variant="contained" color="primary">
          Save Changes
        </Button>
      </Paper>
    </Modal>
  );
};

export default AssignLeader;
