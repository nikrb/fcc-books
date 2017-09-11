import Auth from '../modules/Auth';
import {checkStatus,parseJSON} from '../modules/util';

// get books paged
const getBooks = ( payload) => {
  return fetch( '/api/books', {
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

// find a book from open library with search term
const findBook = ( payload) => {
  return fetch( `/api/search`, {
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
const getMyBooks = () => {
  const owner = Auth.get_id();
  return fetch( '/api/mybooks', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    },
    body: JSON.stringify( {owner})
  })
  .then( checkStatus)
  .then( parseJSON);
};
const addBook = (payload) => {
  return fetch( '/api/book', {
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

const updateUser = (payload) => {
  return fetch( '/api/user', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    },
    body: JSON.stringify( payload)
  })
  .then( checkStatus)
  .then( parseJSON);
}

export default { findBook, updateUser, getBooks, getMyBooks, addBook};
