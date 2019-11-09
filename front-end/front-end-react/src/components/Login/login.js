import React, { Component } from 'react';
import '../../stylesheets/login.scss';
export default class Login extends Component {
  render() {
    return (
        <div id="login">
            <div id="login-title">Login to your account</div>
            <form id="login-form" name="login-form" method="POST" action="#">
                <div className="login-field">
                    <input type="text" name="username" placeholder="Username!" />
                </div>
                <div className="login-field">
                    <input type="password" name="password" placeholder="Password!" />
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