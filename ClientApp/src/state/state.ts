import { atom } from "recoil";

export const AuthTokens = {
  access: atom<string>({
    key: "authenticationAccessToken",
    default: "",
  }),

  refresh: atom<string>({
    key: "authenticationRefreshToken",
    default: "",
  }),
};
