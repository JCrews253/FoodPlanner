import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useUserLoginMutation } from "../gql";
import { AuthStatus, AuthTokens } from "../state/state";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

gql`
  mutation UserLogin($inputs: UserInput!) {
    login(user: $inputs) {
      access
      refresh
    }
  }
`;

const Login = () => {
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: (theme) => theme.spacing(1),
            bgcolor: (theme) => theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            LogIn();
          }}
          sx={{ mt: (theme) => theme.spacing(1) }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: (theme) => theme.spacing(3),
              mb: (theme) => theme.spacing(2),
            }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography component={Link} to="/forgotpassword" variant="body2">
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography component={Link} to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
