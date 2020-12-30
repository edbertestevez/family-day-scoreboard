import React, { useState, useEffect, useCallback } from "react";
import { get_scores, get_games, update_scores } from "../../../api/scoreboard";
import useStyles from "./styles/Tabulation.styles";
import TabulationHeaders from "./TabulationHeaders";
import Grid from "@material-ui/core/Grid";
import { TGame } from "../../../types/Game";
import { TScore } from "../../../types/Scores";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

type TGameScore = {
  red: number;
  blue: number;
  yellow: number;
};

interface IProps {
  reloadTally: () => void;
}

const Tabulation: React.FC<IProps> = ({reloadTally}) => {
  const classes = useStyles();

  const [scores, setScores] = useState([]);
  const [games, setGames] = useState([]);
  const [editMode, setEditMode] = useState({
    rowIndex: -1,
    editing: false,
    gameId: 0,
  });
  const [editScore, setEditScore] = useState<TGameScore>({
    red: 0,
    blue: 0,
    yellow: 0,
  });
  const [editScoreId, setEditScoreId] = useState<TGameScore>({
    red: 0,
    blue: 0,
    yellow: 0,
  });

  const onUpdateClick = (rowScore: TGameScore, rowScoreId: TGameScore, index: number, gameId: number) => {
    setEditScore(rowScore);
    setEditScoreId(rowScoreId);
    setEditMode({ rowIndex: index, editing: true, gameId });
  };

  const onValueChange = (event: any) => {
    if (event.target.value >= 0) {
      setEditScore({ ...editScore, [event.target.name]: parseInt(event.target.value) });
    }
  };

  const onUpdateSave = () => {
    let formattedData: Array<TScore> = [
      {
        id: editScoreId.red,
        teamId: 1,
        gameId: editMode.gameId,
        score: editScore.red,
      },
      {
        id: editScoreId.blue,
        teamId: 2,
        gameId: editMode.gameId,
        score: editScore.blue,
      },
      {
        id: editScoreId.yellow,
        teamId: 3,
        gameId: editMode.gameId,
        score: editScore.yellow,
      },
    ];

    update_scores(formattedData).then((response) => {
      if(response){
        clearEditMode();
        loadData();
        reloadTally();
      }
    });
  };

  const clearEditMode = () => {
    setEditMode({ rowIndex: -1, editing: false, gameId: 0 });
  }

  const loadData = useCallback(() => {
    get_scores().then((response) => {
      setScores(response);
    });

    get_games().then((response) => {
      setGames(response);
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className={classes.container}>
      <TabulationHeaders />

      {games.map((row: TGame, index: number) => {
        let gameScore: Array<TScore> = scores.filter((i: TScore) => i.gameId === row.gameId);
        let redTeamData = gameScore.filter((i: TScore) => i.teamId === 1);
        let blueTeamData = gameScore.filter((i: TScore) => i.teamId === 2);
        let yellowTeamData = gameScore.filter((i: TScore) => i.teamId === 3);

        let redTeamScore = redTeamData.length > 0 ? redTeamData[0] : null;
        let blueTeamScore = blueTeamData.length > 0 ? blueTeamData[0] : null;
        let yellowTeamScore = yellowTeamData.length > 0 ? yellowTeamData[0] : null;

        let rowScore = {
          red: redTeamScore ? redTeamScore.score : 0,
          blue: blueTeamScore ? blueTeamScore.score : 0,
          yellow: yellowTeamScore ? yellowTeamScore.score : 0,
        };

        let rowScoreId = {
          red: redTeamScore ? redTeamScore.id : 0,
          blue: blueTeamScore ? blueTeamScore.id : 0,
          yellow: yellowTeamScore ? yellowTeamScore.id : 0,
        };

        return (
          <div key={`tabulation${index}`} className={classes.rowData} style={{ borderBottom: "1px solid #cacaca" }}>
            <Grid xs={2}>{row.label}</Grid>

            {editMode.editing && editMode.rowIndex === index ? (
              <React.Fragment>
                <Grid xs={3} className={classes.resultColumn}>
                  <TextField
                    autoComplete="off"
                    value={editScore.red}
                    onChange={onValueChange}
                    name="red"
                    type="number"
                    className={classes.editInput}
                  />
                </Grid>
                <Grid xs={3} className={classes.resultColumn}>
                  <TextField
                    autoComplete="off"
                    value={editScore.blue}
                    onChange={onValueChange}
                    name="blue"
                    type="number"
                    className={classes.editInput}
                  />
                </Grid>
                <Grid xs={3} className={classes.resultColumn}>
                  <TextField
                    autoComplete="off"
                    value={editScore.yellow}
                    onChange={onValueChange}
                    name="yellow"
                    type="number"
                    className={classes.editInput}
                  />
                </Grid>
                <Grid xs={1} className={classes.resultColumn}>
                  <Button fullWidth onClick={onUpdateSave} variant="contained" color="primary">
                    {"SAVE"}
                  </Button>
                  <Button
                    fullWidth
                    onClick={clearEditMode}
                    variant="outlined"
                    color="primary"
                  >
                    {"CANCEL"}
                  </Button>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid xs={3} className={classes.resultColumn}>
                  {redTeamData.length > 0 ? redTeamData[0].score : 0}
                </Grid>
                <Grid xs={3} className={classes.resultColumn}>
                  {blueTeamData.length > 0 ? blueTeamData[0].score : 0}
                </Grid>
                <Grid xs={3} className={classes.resultColumn}>
                  {yellowTeamData.length > 0 ? yellowTeamData[0].score : 0}
                </Grid>
                <Grid xs={1} className={classes.resultColumn}>
                  {!editMode.editing && (
                    <Button
                      fullWidth
                      onClick={() => onUpdateClick(rowScore, rowScoreId, index, row.gameId)}
                      variant="contained"
                      color="primary"
                    >
                      {"UPDATE"}
                    </Button>
                  )}
                </Grid>
              </React.Fragment>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Tabulation;