import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useRegisterMutation } from "../gql";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

gql`
  mutation Register($inputs: UserInput!) {
    register(user: $inputs)
  }
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassord] = useState(false);
  const history = useHistory();

  const { mutate, isLoading } = useRegisterMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess: ({ register }) => {
        console.log({ register });
        if (register !== null) {
          history.push("/");
        } else {
          setError(true);
          setPassword("");
          setConfirmPassword("");
        }
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );

  const Register = () => {
    if (password === confirmPassword) {
      mutate({
        inputs: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      });
    }
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
        <Box
          component="form"
          sx={{ mt: 3 }}
          onSubmit={(e: any) => {
            e.preventDefault();
            Register();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                fullWidth
                label="First Name"
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
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
              <Typography variant="body2" component={Link} to="/login">
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
