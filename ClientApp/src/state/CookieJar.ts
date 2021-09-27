export const GetCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  return cookies.find((c) => c.startsWith(`${name}=`))?.split("=")[1];
};

export const CreateCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}`;
};

export const DeleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};
