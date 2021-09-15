import {
  Button,
  createStyles,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useRegisterMutation } from "../gql";

gql`
  mutation Register($inputs: UserInput!) {
    register(user: $inputs)
  }
`;

const styles = (theme: Theme) =>
  createStyles({
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      margin: "20px",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
      width: "300px",
      alignSelf: "center",
      justifySelf: "center",
      backgroundColor: theme.palette.background.paper,
    },
    textField: {
      margin: "10px",
      width: "100%",
      backgroundColor: theme.palette.background.default,
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.text.primary,
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: theme.palette.text.primary,
      },
      "& .MuiInputLabel-root": {
        color: theme.palette.text.primary,
      },
    },
    button: {
      margin: "10px",
      width: "100%",
      height: "50px",
      color: theme.palette.text.primary,
    },
    divider: {
      backgroundColor: theme.palette.text.primary,
      width: "100%",
      height: "1px",
      opacity: 0.5,
      borderRadius: "5px",
      marginTop: "11px",
    },
    errorText: {
      color: theme.palette.error.main,
    },
    header: {
      margin: "10px",
      color: theme.palette.text.primary,
    },
    input: {
      color: theme.palette.text.primary,
    },
  });

const Register = ({ classes }: WithStyles<typeof styles>) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassord] = useState(false);
  const history = useHistory();

  const { mutate } = useRegisterMutation<Error>(graphqlRequestClient, {
    onSuccess: ({ register }) => {
      if (register !== null) {
      } else {
        setError(true);
        setPassword("");
      }
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const Register = () => {
    mutate({
      inputs: {
        email: email,
        password: password,
      },
    });
  };

  return (
    <div className={classes.content}>
      <Typography variant="h4" className={classes.header}>
        Food Planner
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        className={classes.textField}
        color="secondary"
        inputProps={{
          className: classes.input,
        }}
        InputLabelProps={{
          className: classes.input,
        }}
        error={error}
        onChange={(e) => setEmail(e.currentTarget.value)}
        value={email}
      />
      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          error={error}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setShowPassord(false)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassord(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel>Confirm Password</InputLabel>
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          error={error}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => setShowPassord(false)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassord(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      {error ? (
        <Typography variant="body2" className={classes.errorText}>
          Passwords don't match.
        </Typography>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disableRipple
        onClick={() => {
          if (password.length > 2 && password === confirmPassword) {
            Register();
          } else {
            setError(true);
          }
        }}
      >
        Register
      </Button>
      <hr className={classes.divider} />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        disableRipple
        onClick={() => history.push("/signin")}
      >
        Go to Log In
      </Button>
    </div>
  );
};

export default withStyles(styles)(Register);
