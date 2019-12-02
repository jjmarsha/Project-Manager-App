import React from 'react';
import './App.css';
import NavigationSideBar from './components/Navigation/Navigation';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Links} from "./PageLinks";
import {Row} from "reactstrap";
import Board from "./pages/Board/Board";



function App(props) {
  return (
    <>
      <div style={{width: "100%"}}>
        <NavigationSideBar handleSession={props.handleSession} Dev_NoLogin={props.Dev_NoLogin}/>
      </div>
      <Row style={{width: "100%", padding: "0", margin: "auto"}}>
        <BrowserRouter>
          <Switch>
                <div style={{margin: "auto", display: "flex"}}>
                  <Board guest={props.guest}/>
                </div>
          </Switch>
        </BrowserRouter>
      </Row>
    </>
  );
}


export default App;
