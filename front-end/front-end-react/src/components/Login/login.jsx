import React, { Component } from 'react';
import '../../stylesheets/login.scss';
import axios from 'axios';



/*
  Use a function to submit ajax requests. You can bind a function to the class in the constructor.
  Have all the form values stored in the class's state. Use the onChange attribute to update the state
  You can either use fetch or axios for Ajax requests
*/



export default class Login extends Component {
  // componentDidMount() {
  //   axios.get('http://localhost:8080/final-project/login')
  //   .then(response => {
  //     this.setState({error: response.data});
  //   })
  //   .catch(error=> {
  //     console.log("hello");
  //     console.log(error);
  //   })
  // }

  constructor(props) {  
    super(props);
    this.state = {
      error: '',
      username: '',
      password: ''
    }
  }


  handleChange = event => {
    console.log(event.target);

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

    axios.post("http://localhost:8080/johnzkan_CSCI201L_final_project/login", {data})
      .then(results => {
        console.log(results);
        console.log(results.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }



  // FETCH by chris
  // constructor() {
  //   super();
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }
  // handleSubmit(event) {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   var endpoint = "https://cors-anywhere.herokuapp.com/localhost:8080/201FinalProj/login";
  //   fetch(endpoint, {
  //     body: data,
  //   })
  //   .then(data => {
  //     console.log(data);
  //   });
  // }

  render() {
    return (
      <div id="login-page">
        <div id="login">
            <div id="login-title">Login to your account</div>
            <form id="login-form" onSubmit={this.handleSubmit}>
                <div className="login-field">
                    <img class="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png"></img>
                    <input type="text" autoComplete={false} name="username" placeholder="Username" onChange = {this.handleChange} value={this.state.username} />
                </div>
                <div className="login-field">
                    <img class="icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png"></img>
                    <input type="password" name="password" autoComplete={false} placeholder="Password" onChange = {this.handleChange} value={this.state.password} />
                </div>
                <div className="login-field">
                    <input type="submit" name="submit" id="login-submit" value="Log in" />
                </div>
            </form>
        </div>
      </div>
    );
  }
}