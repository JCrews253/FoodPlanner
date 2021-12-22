import { atom } from "recoil";
import { CreateCookie, GetCookie } from "./CookieJar";

export const AuthTokens = {
  access: atom<string>({
    key: "authenticationAccessToken",
    default: "",
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((access) => {
          CreateCookie("authenticationAccessToken", access);
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
          CreateCookie("authenticationRefreshToken", refresh);
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

const defaultTheme = GetCookie("theme") === "dark" ? "dark" : "light";
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

export const isMobileAtom = atom<boolean>({
  key: "isMobile",
  default: window.innerWidth < 750,
});
