import jwt_decode from 'jwt-decode';
import parseCookie from './parse-cookie';

const getJwt = (raw) => {
  const cookie = document.cookie;
  const cookieObj = parseCookie(cookie);

  return raw? cookieObj.jwt : jwt_decode(cookieObj.jwt);
}

const isJwtExpired = () => {
  console.log(Date.now(), getJwt(false).exp)
  return Date.now() > getJwt(false).exp * 1000;
}

const isJwtEmptyOrInvalid = () => {
  try {
    const obj = getJwt(false);
    if(!obj.email || !obj.exp) { throw Error('Invalid jwt'); } 

    console.log(obj);
    return false;
  }catch(e) {
    console.log(e);
    return true;
  }
}

export { getJwt, isJwtExpired, isJwtEmptyOrInvalid }; 