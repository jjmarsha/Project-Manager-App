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


  handleChange = event => {
    this.setState({ 
      username: event.target.value
     });
  }

  handlesubmit = event => {
    event.preventDefault();

    const data = {
      username: this.state.username
    }

    axios.post("http://localhost:8080/final-project/login", {data})
      .then(results => {
        console.log(results);
        console.log(results.data);
      })
  }

  constructor(props) {  
    super(props);
    this.state = {
      error: '',
      username: '',
      password: ''
    }
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
        <div id="login">
            <div id="login-title">Login to your account</div>
            <form id="login-form" onSubmit={this.handleSubmit}>
                <div className="login-field">
                    <input type="text" autoComplete={false} name="username" placeholder="Username!" onChange = {this.handleChange} />
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