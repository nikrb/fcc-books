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
};
const getToken = () => { return localStorage.getItem( 'token'); };
const getUsername = () => { return localStorage.getItem( 'name'); };
const getEmail = () => { return localStorage.getItem( 'email'); };
const getFullName = () => { return localStorage.getItem( 'full_name'); };
const getCity = () => { return localStorage.getItem( 'city'); };
const getProvince = () => { return localStorage.getItem( 'province');};

export default { authenticateUser, isUserAuthenticated, deauthenticateUser,
                  getToken, getUsername, getEmail,
                  getFullName, getCity,getProvince};
