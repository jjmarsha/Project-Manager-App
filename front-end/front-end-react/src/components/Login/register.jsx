import React, { Component } from 'react';
import '../../stylesheets/login.scss';
import axios from 'axios';



/*
  Use a function to submit ajax requests. You can bind a function to the class in the constructor.
  Have all the form values stored in the class's state. Use the onChange attribute to update the state
  You can either use fetch or axios for Ajax requests
*/



export default class Register extends Component {

  render() {
    return (
        <div id="register">
            <div id="register-title">Register for a new account</div>
            <form id="register-form" onSubmit={this.handleSubmit}>
                <div className="register-field">
                    <img class="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png"></img>
                    <input type="text" autoComplete={false} name="username" placeholder="Username" onChange = {this.handleChange} />
                </div>
                <div className="register-field">
                    <img class="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png"></img>
                    <input type="password" name="password" autoComplete={false} placeholder="Password" />
                </div>
                <div className="register-field">
                    <input type="submit" name="submit" id="login-submit" value="Log in" />
                </div>
            </form>
      </div>
    );
  }
}