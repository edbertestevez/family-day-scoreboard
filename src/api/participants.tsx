import Axios from "axios";
import { BACKEND_ROOT } from "../config/requests";
import { IParticipantData } from "../types/Participants";

const MODULE_ROOT_API = BACKEND_ROOT + "participants";

export const register = (params: IParticipantData) => {
  return Axios.post(MODULE_ROOT_API + "/create", params)
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};

export const get_members = () => {
  return Axios.get(MODULE_ROOT_API + "/list")
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};


export const generate_teams = () => {
  return Axios.post(MODULE_ROOT_API + "/generate-team")
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};

export const delete_participant = (participantId: number) => {
  return Axios.delete(MODULE_ROOT_API + "/delete/" + participantId)
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};

export const assign_leader = (participantId: number, teamId: number) => {
  return Axios.patch(MODULE_ROOT_API + "/assign-leader", {participantId, teamId})
  .then((response) => {
    return response.data;
  })
  .catch(err => {
    alert("Something went wrong. Please try again.")
    console.log(err);
  });
};
