import React, { useState } from "react";
import { Route } from "react-router";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Layout>
      <button onClick={() => setLoggedIn(!loggedIn)}>toggle</button>
      <Route path="/" render={() => (loggedIn ? <Home /> : <SignIn />)} />
      <Route path="/signin" component={SignIn} />
      <Route path="/counter" render={() => <Counter />} />
      <Route path="/fetch-data" render={() => <FetchData />} />
    </Layout>
  );
};

export default App;
