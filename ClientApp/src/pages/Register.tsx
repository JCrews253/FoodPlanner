import { Copyright } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  withStyles,
} from "@mui/material";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useRegisterMutation } from "../gql";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

gql`
  mutation Register($inputs: UserInput!) {
    register(user: $inputs)
  }
`;

const Register = () => {
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={() => Register()} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Register;
