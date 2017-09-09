const authenticateUser = ( user) => {
  localStorage.setItem( 'token', user.token);
  localStorage.setItem( 'name', user.name);
  localStorage.setItem( 'email', user.email);
  localStorage.setItem( 'full_name', user.full_name);
  localStorage.setItem( 'city', user.city);
  localStorage.setItem( 'province', user.province);
};
const isUserAuthenticated = () => {
  return localStorage.getItem( 'token') !== null;
};
const deauthenticateUser = () => {
  localStorage.removeItem( 'token');
  localStorage.removeItem( 'name');
  localStorage.removeItem( 'email');
  localStorage.removeItem( 'full_name');
  localStorage.removeItem( 'cit');
  localStorage.removeItem( 'province');
};
const getToken = () => {
  const ret = localStorage.getItem( 'token');
  if( ret === 'undefined'){
    return "";
  }
  return ret;
};
const getUsername = () => {
  const ret = localStorage.getItem( 'name');
  if( ret === 'undefined'){
    return "";
  }
  return ret;
};
const getEmail = () => {
  const ret = localStorage.getItem( 'email');
  if( ret === 'undefined'){
    return "";
  }
  return ret;
};
const getFullName = () => {
  const ret = localStorage.getItem( 'full_name')||"";
  if( ret === 'undefined'){
    return "";
  }
  return ret;
};
const setFullName = ( name) => {
  localStorage.setItem( 'full_name', name);
};
const getCity = () => {
  const ret = localStorage.getItem( 'city');
  if( ret === 'undefined'){
    return "";
  }
  return ret;
};
const setCity = ( city) => {
  localStorage.setItem( 'city', city);
};
const getProvince = () => {
  const ret = localStorage.getItem( 'province');
  if( ret === 'undefined'){
    return "";
  }
  return ret;
};
const setProvince = ( prov) => {
  localStorage.setItem( 'province', prov);
};

export default { authenticateUser, isUserAuthenticated, deauthenticateUser,
                  getToken, getUsername, getEmail,
                  getFullName, getCity,getProvince,
                  setFullName, setCity,setProvince};
