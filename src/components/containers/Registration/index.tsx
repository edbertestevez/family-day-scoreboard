import React, { useEffect, useState, useCallback } from "react";
import useStyles from "./styles/Registration.style";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { isNullEmptyOrUndefined } from "../../../utils/common";
import FormHelperText from "@material-ui/core/FormHelperText";
import { register } from "../../../api/participants";

export default function Registration() {
  const classes = useStyles();

  const [hasSubmit, setHasSubmit] = useState(false);

  const initialState = {
    lastName: "",
    firstName: "",
    categoryId: "",
  };

  const [state, setState] = useState(initialState);

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    categoryId: "",
  });

  let isLastNameError = !isNullEmptyOrUndefined(errors.lastName);
  let isFirstNameError = !isNullEmptyOrUndefined(errors.firstName);
  let isCategoryError = !isNullEmptyOrUndefined(errors.categoryId);

  const onValueChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onFormSubmit = (event: any) => {
    event.preventDefault();

    setHasSubmit(true);

    if (!validateForm()) {
      register(state).then((response) => {
        if (response.affectedRows > 0) {
          alert("Registered Successfully!");
          setHasSubmit(false);
          setState(initialState);
        } else {
          alert("Registration Failed!");
        }
      });
    }
  };

  const validateForm = useCallback(() => {
    let hasErrors = false;
    let newErrors: typeof errors = {
      lastName: "",
      firstName: "",
      categoryId: "",
    };

    if (isNullEmptyOrUndefined(state.lastName)) {
      newErrors.lastName = "Required";
      hasErrors = true;
    }

    if (isNullEmptyOrUndefined(state.firstName)) {
      newErrors.firstName = "Required";
      hasErrors = true;
    }

    if (isNullEmptyOrUndefined(state.categoryId)) {
      newErrors.categoryId = "Required";
      hasErrors = true;
    }

    setErrors(newErrors);

    return hasErrors;
  }, [state.lastName, state.firstName, state.categoryId]);

  useEffect(() => {
    if (hasSubmit) {
      validateForm();
    }
  }, [state, validateForm, hasSubmit]);

  return (
    <div className={classes.container}>
      <h2>REGISTRATION FORM</h2>

      <Card className={classes.card}>
        <form className={classes.form} onSubmit={onFormSubmit}>
          <div className={classes.field}>
            <TextField
              autoComplete="off"
              fullWidth
              name="lastName"
              value={state.lastName}
              onChange={onValueChange}
              error={isLastNameError}
              label="Last Name"
            />
            <FormHelperText error={isLastNameError}>{errors.lastName}</FormHelperText>
          </div>

          <div className={classes.field}>
            <TextField
              autoComplete="off"
              fullWidth
              value={state.firstName}
              onChange={onValueChange}
              error={isFirstNameError}
              name="firstName"
              label="First Name"
            />
            <FormHelperText error={isFirstNameError}>{errors.firstName}</FormHelperText>
          </div>

          <FormControl className={classes.field}>
            <InputLabel id="select-category">Category</InputLabel>
            <Select
              error={isCategoryError}
              labelId="select-category"
              name="categoryId"
              value={state.categoryId}
              fullWidth
              onChange={onValueChange}
            >
              <MenuItem value={1}>Parents</MenuItem>
              <MenuItem value={2}>Young Adults</MenuItem>
              <MenuItem value={3}>Kids</MenuItem>
            </Select>
            <FormHelperText error={isCategoryError}>{errors.categoryId}</FormHelperText>
          </FormControl>

          <Button fullWidth className={classes.submit} type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
