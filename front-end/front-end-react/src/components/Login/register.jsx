import React, { Component } from 'react';
import '../../stylesheets/login.scss';
import axios from 'axios';



/*
  Use a function to submit ajax requests. You can bind a function to the class in the constructor.
  Have all the form values stored in the class's state. Use the onChange attribute to update the state
  You can either use fetch or axios for Ajax requests
*/



export default class Register extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      error: '',
      username: '',
      password: '',
      samePass: '',
      projectID: '',
      projectName: '',
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

    axios.get(`http://localhost:8080/johnzkan_CSCI201L_final_project/register?username=${this.state.username}&password=${this.state.password}&samePass=${this.state.samePass}&projectID=${this.state.projectID}&projectName=${this.state.projectName}`)
      .then(results => {
        if(results.data.msg != null) {
          this.setState({
            [this.state.error]: results.data.msg
          });
          console.log("error");
          console.log(results.data.msg);
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
            <div id="login-title" style={{textAlign: "center"}}>Register for a new account</div>
            <form id="login-form" onSubmit={this.handleSubmit}>
                <div className="login-field">
                    <img className="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png"></img>
                    <input type="text" autoComplete="off" name="username" placeholder="Username" onChange = {this.handleChange} value={this.state.username} />
                </div>
                <div className="login-field">
                    <img className="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png"></img>
                    <input type="password" name="password" autoComplete="off" placeholder="Password" onChange = {this.handleChange} value={this.state.password} />
                </div>
                <div className="login-field">
                    <img className="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png"></img>
                    <input type="password" name="samePass" autoComplete="off" placeholder="Confirm password" onChange = {this.handleChange} value={this.state.samePass} />
                </div>
                <div className="login-field">
                    <input type="text" name="projectID" autoComplete="off" placeholder="Enter a Project ID to join one" onChange = {this.handleChange} value={this.state.projectID} />
                </div>
                <div className="login-field">
                    <input type="text" name="projectName" autoComplete="off" placeholder="Enter a Project Name to start one" onChange = {this.handleChange} value={this.state.projectName} />
                </div>
                <div id="error">
                  {this.state.error}
                </div>
                <div className="login-field" style={{margin: "auto", textAlign: "center"}}>
                    <input type="submit" name="submit" id="login-submit" value="Register" />
                </div>
            </form>
        </div>
      </div>
    );
  }
}