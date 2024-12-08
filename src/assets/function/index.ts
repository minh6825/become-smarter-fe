import cookie from 'js-cookie'
import { deleteCookie, getCookie } from "cookies-next";

export function getCookieFc() {
  // const accessToken = getCookie(name)
  return cookie.get('accessToken')
  
  }
  