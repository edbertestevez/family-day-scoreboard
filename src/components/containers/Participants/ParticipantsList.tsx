import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import useStyles from "./styles/Modal.style";
import { IParticipant } from "../../../types/Participants";
import { delete_participant, get_members } from "../../../api/participants";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { isNullEmptyOrUndefined } from "../../../utils/common";

interface IProps {
  visible: boolean;
  onCloseModal: () => void;
}

const ParticipantsList: React.FC<IProps> = ({ visible, onCloseModal }) => {
  const classes = useStyles();
  const [list, setList] = useState<Array<IParticipant>>([]);
  const [filteredList, setFilteredList] = useState<Array<IParticipant>>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    get_members().then((response) => {
      setList(response);
      setFilteredList(response);
    });
  }, []);

  const onSearchChange = (event: any) => {
    let searchValue = event.target.value;
    setSearch(searchValue);

    let filteredSearch = isNullEmptyOrUndefined(searchValue)
      ? list
      : list.filter(
          (i) =>
            i.firstName.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
            i.lastName.toLowerCase().includes(searchValue.trim().toLowerCase())
        );
    setFilteredList(filteredSearch);
  };

  const onDelete = (participantId: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      delete_participant(participantId).then((response) => {
        setList(list.filter((i) => i.participantId !== participantId));
        setFilteredList(filteredList.filter((i) => i.participantId !== participantId));
      });
    }
  };

  return (
    <Modal
      open={visible}
      onClose={onCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.container}
    >
      <Paper className={classes.modalContent}>
        <TextField
          autoComplete="off"
          value={search}
          onChange={onSearchChange}
          name="red"
          placeholder="Search Participant"
          fullWidth
        />
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredList.map((row: IParticipant) => (
                <TableRow key={row.participantId}>
                  <TableCell component="th">{row.lastName}</TableCell>
                  <TableCell component="th">{row.firstName}</TableCell>
                  <TableCell component="th">{row.categoryName}</TableCell>
                  <TableCell component="th">
                    <Button onClick={() => onDelete(row.participantId)} variant="contained" color="secondary">
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Modal>
  );
};

export default ParticipantsList;
