import {
  Button,
  createStyles,
  TextField,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useUserLoginMutation } from "../gql";
import { AuthTokens } from "../state/state";

gql`
  mutation UserLogin($inputs: UserInput!) {
    login(user: $inputs) {
      access
      refresh
    }
  }
`;

const styles = createStyles({
  signInContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    height: "-webkit-fill-available",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
    minWidth: "300px",
  },
  button: {
    margin: "10px",
    width: "100%",
    height: "50px",
  },
  divider: {
    backgroundColor: "grey",
    width: "100%",
    height: "1px",
    opacity: 0.5,
    borderRadius: "5px",
  },
});

const SignIn = ({ classes }: WithStyles<typeof styles>) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAccessToken = useSetRecoilState(AuthTokens.access);
  const setRefreshToken = useSetRecoilState(AuthTokens.refresh);

  const { mutate } = useUserLoginMutation<Error>(graphqlRequestClient, {
    onSuccess: ({ login }) => {
      setAccessToken(login?.access ?? "");
      setRefreshToken(login?.refresh ?? "");
    },
  });

  return (
    <div className={classes.signInContainer}>
      <div className={classes.content}>
        <h1>Food Planner</h1>
        <TextField
          label="Email"
          variant="outlined"
          className={classes.button}
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          className={classes.button}
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />
        <Button
          variant="contained"
          className={classes.button}
          disableRipple
          onClick={() => {
            mutate({
              inputs: {
                email: email,
                password: password,
              },
            });
          }}
        >
          Log In
        </Button>
        <hr className={classes.divider} />
        <Button variant="contained" className={classes.button} disableRipple>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignIn);
