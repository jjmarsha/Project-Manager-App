import React, { Component } from 'react';
import '../../stylesheets/login.scss';


/*
  Use a function to submit ajax requests. You can bind a function to the class in the constructor.
  Have all the form values stored in the class's state. Use the onChange attribute to update the state
  You can either use fetch or axios for Ajax requests
*/


export default class Login extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var endpoint = "https://cors-anywhere.herokuapp.com/localhost:8080/201FinalProj/login";
    fetch(endpoint, {
      body: data,
    })
    .then(data => {
      console.log(data);
    });
  }


  render() {
    return (
        <div id="login">
            <div id="login-title">Login to your account</div>
            <form id="login-form" onSubmit={this.handleSubmit}>
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