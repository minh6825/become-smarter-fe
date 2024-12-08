import { deleteCookie, getCookie } from "cookies-next";

export function getCookieFc(name: string) {
  const accessToken = getCookie(name)
  return accessToken
  }
  