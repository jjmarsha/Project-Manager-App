import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from './components/Loading';


//If logged in
const App = React.lazy(() => import("./App"));

//If not, we'll send them to the login page
const Login = React.lazy(() => import("./components/Login/login"));

//Set this to true/false if you want to test the Login or the App component
const Dev_NoLogin = true;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session: "",
        };

        this.handleSession = this.handleSession.bind(this);
    }

    componentDidMount() {
        const session = window.localStorage.getItem("session");
        if(session !== "") {
            this.setState(() => {return {session: session}});
        }
    }

    handleSession(session) {
        this.setState((prevState) => {
            return {
                ...prevState,
                session: session,
            }
        });
    }

    render() {
        if(this.state.session !== "") {
            return (
                <React.Suspense fallback={<Loading/>}>
                    <App handleSession={this.handleSession} Dev_NoLogin={Dev_NoLogin}/>
                </React.Suspense>
            )
        } else {
            return (
                <React.Suspense fallback={<Loading/>}>
                    <Login handleSession={this.handleSession}/>
                </React.Suspense>
            )
        }
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

