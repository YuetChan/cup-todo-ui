import axios from "axios";

import { getJwt } from './jwt-util';

const getRequestById = async (id) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_REST_HOST}/requests/${id}`).then(res => {
    if(res.status === 200) {
      return res.data.data.request;
    }else {
      throw new Error('Unknown error');
    } 
  })
}

const getRequestsByEmail = (email) => {
  return axios.get(`${process.env.NEXT_PUBLIC_REST_HOST}/requests/users?email=${email}`).then(res => {
    console.log(res.data.data.requests);
    return res.data.data.requests;
  });
}

const submitRequest = async (json) => {
  const defaultHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': `Bearer ${getJwt(true)}`,
  };

  return await axios.post(`${process.env.NEXT_PUBLIC_ABAC_HOST}/requests`, json, {
    headers: defaultHeaders
  }).then(res => {
    if(res.status === 201) {
      console.log(res.data)
      const data = res.data.data;
      return {
        requestId: data.request.id,
        reportId: data.report.id,
      };
    }else {
      throw new Error('Unknown error');
    } 
  });
}

const getCensoredReportById = async (id) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_REST_HOST}/reports/${id}/censored`).then(res => {
    if(res.status === 200) {
      return res.data.data.report;
    }else {
      throw new Error('Unknown error');
    } 
  })
}

export { getRequestById, getRequestsByEmail, submitRequest, getCensoredReportById }