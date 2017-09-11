import React from 'react';
import UserDetailForm from '../components/settings/UserDetailForm';
import PasswordForm from '../components/settings/PasswordForm';
import Actions from './Actions';
import Auth from '../modules/Auth';

export default class SettingsPage extends React.Component {
  state = {
    errors: {},
    user: {
      password:"",
      new_password: "",
      name: Auth.getUsername(),
      email: Auth.getEmail(),
      full_name: Auth.getFullName(),
      city: Auth.getCity(),
      province: Auth.getProvince()
    }
  };
  componentDidMount = () => {
    console.log( "settings page user:", this.state.user);
  };
  changeUser = ( event) => {
    // event target name not user name!
    const {name, value} = event.target;
    const user = this.state.user;
    user[name] = value;
    this.setState( {user});
  };
  processPasswordForm = (event) => {
    event.preventDefault();
    const {password, new_password} = this.state.user;
    const email = Auth.getEmail();
    console.log( `email:[${email}] passwords current:[${password}] new[${new_password}] `);
    Actions.postChangePassword( {email, password, new_password})
    .then( (response) => {
      console.log( "change password response:", response);
      Auth.authenticateUser( {token: response.token, name: response.user.name, email: email});
      this.setState( { errors: { summary: response.message }});
    })
    .catch( (err) => {
      console.error( "change password failed:", err);
      err.response.json().then( (res) => {
        console.log( res);
        const ne = { ...res.errors, summary: res.message};
        this.setState( { errors: ne});
      });
    });
  };
  processUserDetailForm = ( event) => {
    event.preventDefault();
    const {full_name, city, province} = this.state.user;
    const email = Auth.getEmail();
    Actions.postChangeUserDetail( { email, full_name, city, province})
    .then( (response) => {
      console.log( response);
      if( response.success){
        Auth.setFullName( full_name);
        Auth.setCity( city);
        Auth.setProvince( province);
      }
    })
    .catch( (err) => {
      console.error( "post user detail form failed:", err);
    });
  };
  render = () => {
    const base_detail = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    };
    const base_text = {
      margin: "5px"
    };
    const form_wrapper = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
    };
    return (
      <div className="App">
        <h1 style={{textAlign:"center"}}>Settings</h1>
        <div style={base_detail}>
          <span style={base_text}>Name: {this.state.user.name}</span>
          <span style={base_text}>Email: {this.state.user.email}</span>
        </div>
        <div style={form_wrapper} >
          <UserDetailForm onSubmit={this.processUserDetailForm} onChange={this.changeUser}
            user={this.state.user} errors={this.state.errors} />
          <PasswordForm onSubmit={this.processPasswordForm} onChange={this.changeUser}
            user={this.state.user} errors={this.state.errors} />
        </div>
      </div>
    );
  };
}
