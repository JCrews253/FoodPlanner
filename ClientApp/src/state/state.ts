import { atom } from "recoil";
import { CreateCookie, GetCookie } from "./CookieJar";

export var AuthTokenAccess = "";
export var AuthTokenRefresh = "";

export const AuthTokens = {
  access: atom<string>({
    key: "authenticationAccessToken",
    default: "",
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((access) => {
          AuthTokenAccess = access;
        });
      },
    ],
  }),

  refresh: atom<string>({
    key: "authenticationRefreshToken",
    default: "",
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((refresh) => {
          AuthTokenRefresh = refresh;
        });
      },
    ],
  }),
};

export const AuthStatus = {
  loggedIn: atom<boolean>({
    key: "authStatusLoggedIn",
    default: false,
  }),
};

const defaultTheme = GetCookie("theme") === "dark" ? "dark" : "dark";
export const themeAtom = atom<"light" | "dark">({
  key: "theme",
  default: defaultTheme,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((theme) => {
        CreateCookie("theme", theme);
      });
    },
  ],
});
