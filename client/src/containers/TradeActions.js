import Auth from '../modules/Auth';
import {checkStatus,parseJSON} from '../modules/util';

const getMyRequests = ( payload) => {
  return fetch( '/api/request', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    },
    body: JSON.stringify( payload)
  })
  .then( checkStatus)
  .then( parseJSON);
};

const saveTrade = (payload) => {
  return fetch( '/api/trade', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    },
    body: JSON.stringify( payload)
  })
  .then( checkStatus)
  .then( parseJSON);
};

export default {getMyRequests,saveTrade};
