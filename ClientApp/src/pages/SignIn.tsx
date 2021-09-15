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
import { useSetRecoilState } from "recoil";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useUserLoginMutation } from "../gql";
import { AuthStatus, AuthTokens } from "../state/state";

gql`
  mutation UserLogin($inputs: UserInput!) {
    login(user: $inputs) {
      access
      refresh
    }
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

const SignIn = ({ classes }: WithStyles<typeof styles>) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAccessToken = useSetRecoilState(AuthTokens.access);
  const setRefreshToken = useSetRecoilState(AuthTokens.refresh);
  const setLoggedIn = useSetRecoilState(AuthStatus.loggedIn);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassord] = useState(false);
  const history = useHistory();

  const { mutate } = useUserLoginMutation<Error>(graphqlRequestClient, {
    onSuccess: ({ login }) => {
      console.log({ login });
      if (login !== null) {
        setAccessToken(login?.access ?? "");
        setRefreshToken(login?.refresh ?? "");
        setLoggedIn(true);
        history.push("/");
      } else {
        setError(true);
        setPassword("");
      }
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const LogIn = () => {
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              LogIn();
            }
          }}
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
          Invalid Login
        </Typography>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disableRipple
        onClick={() => LogIn()}
      >
        Log In
      </Button>
      <hr className={classes.divider} />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        disableRipple
        onClick={() => history.push("/register")}
      >
        Create Account
      </Button>
    </div>
  );
};

export default withStyles(styles)(SignIn);
