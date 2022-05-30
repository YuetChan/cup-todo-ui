import axios from "axios";

import { getJwt } from './jwt-util';

const getSessionUserId = () => {
  console.log(getJwt(false))
  return getJwt(false).id;
}

const getSessionUserEmail = () => {
  return getJwt(false).email;
}

const getUserByEmail = (email) => {
  return axios.get(`${process.env.NEXT_PUBLIC_REST_HOST}/users?email=${email}`).then(res => {
    console.log(res.data.data.user);
    return res.data.data.user;
  });
}

export { getSessionUserId, getSessionUserEmail, getUserByEmail }