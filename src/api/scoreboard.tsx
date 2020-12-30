import Axios from "axios";
import { BACKEND_ROOT } from "../config/requests";
import { TScore } from "../types/Scores";

const MODULE_ROOT_API = BACKEND_ROOT + "scoreboard";

export const get_games = () => {
  return Axios.get(MODULE_ROOT_API + "/games")
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};

export const get_tally = () => {
  return Axios.get(MODULE_ROOT_API + "/team_total")
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};

export const get_scores = () => {
  return Axios.get(MODULE_ROOT_API + "/scores")
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};

export const update_scores = (params: Array<TScore>) => {
  return Axios.patch(MODULE_ROOT_API + "/update", params)
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};