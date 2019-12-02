import React, { Component } from 'react';
import '../../stylesheets/login.scss';
import axios from 'axios';

  // Use a function to submit ajax requests. You can bind a function to the class in the constructor.
  // Have all the form values stored in the class's state. Use the onChange attribute to update the state
  // You can either use fetch or axios for Ajax requests

export default class Login extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      error: '',
      username: '',
      password: '',
      admin: false,
    }
  }


  handleChange = event => {
    this.setState({ 
      [event.target.name]: event.target.value
     });
  }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password
    }

    axios.get(`http://localhost:8080/johnzkan_CSCI201L_final_project/login?username=${this.state.username}&password=${this.state.password}`)
      .then(results => {
        if(results.data.msg == "Invalid username and password combination") {
          console.log("error");
          console.log(results.data.msg);
          this.setState({
            [this.state.error]: results.data.msg
          });
        } else {
          console.log(results.data);
          window.localStorage.setItem("projectID", results.data.projectID);
          window.localStorage.setItem("session", this.state.username);
          this.props.handleSession(this.state.username);
        }
      });
  }

  render() {
    return (
      <div id="login-page">
        <div id="login" style={{padding: "80px 40px 40px 40px"}}>
            <div id="login-title" style={{textAlign: "center"}}>Login to your account</div>
            <form id="login-form" onSubmit={this.handleSubmit}>
                <div className="login-field">
                    <img className="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png"></img>
                    <input type="text" autoComplete="off" name="username" placeholder="Username" onChange = {this.handleChange} value={this.state.username} />
                </div>
                <div className="login-field">
                    <img className="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png"></img>
                    <input type="password" name="password" autoComplete="off" placeholder="Password" onChange = {this.handleChange} value={this.state.password} />
                </div>
                <div id="error">
                  {this.state.error}
                </div>
                <div className="login-field" style={{margin: "auto", textAlign: "center"}}>
                    <input type="submit" name="submit" id="login-submit" value="Log in" />
                </div>
                <div id="redirects">
                  <div id="register-link" onClick={this.props.toggle}>Register</div>
                  <div id="guest-link"  onClick={this.props.guestHandler}>Continue as guest</div>
                </div>
                
            </form>
        </div>
      </div>
    );
  }
}