import React, { Component } from 'react';
import '../../stylesheets/login.scss';


/*
  Use a function to submit ajax requests. You can bind a function to the class in the constructor.
  Have all the form values stored in the class's state. Use the onChange attribute to update the state
  You can either use fetch or axios for Ajax requests
*/


export default class Login extends Component {
  render() {
    return (
        <div id="login">
            <div id="login-title">Login to your account</div>
            <form id="login-form" name="login-form" method="POST" action="#">
                <div className="login-field">
                    <input type="text" autoComplete={false} name="username" placeholder="Username!" />
                </div>
                <div className="login-field">
                    <input type="password" name="password" autoComplete={false} placeholder="Password!" />
                </div>
                <div className="login-field">
                    <input type="submit" name="submit" id="login-submit" value="Log in" />
                    <div className="forgot"><a href="#">FORGOT PSSSWORD</a></div>
                </div>
            </form>
      </div>
    );
  }
}