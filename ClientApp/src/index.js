import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot, useRecoilValue } from "recoil";
import { themeAtom } from "./state/state";
import { darkTheme, lightTheme } from "./Theme";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

const queryClient = new QueryClient();

const ThemeProvider = ({ children }) => {
  const theme = useRecoilValue(themeAtom);
  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </MuiThemeProvider>
  );
};

ReactDOM.render(
  <Auth0Provider
    domain="dev-r1o3z-ez.us.auth0.com"
    clientId="dd3o0rKf2IhR8oKCFs9jT0uuc2IIZPCN"
    redirectUri={window.location.origin}
    audience="https://dev-r1o3z-ez.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
    useRefreshTokens={true}
  >
    <RecoilRoot>
      <ThemeProvider>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <BrowserRouter basename={baseUrl}>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  </Auth0Provider>,
  rootElement
);
