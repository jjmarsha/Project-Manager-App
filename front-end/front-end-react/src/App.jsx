import React from 'react';
import './App.css';
import NavigationSideBar from './components/Navigation/Navigation';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Links} from "./PageLinks";
import {Row} from "reactstrap";


function App() {
  return (
    <Row style={{width: "100%"}}>
      <BrowserRouter>
        <NavigationSideBar/>
        <Switch>
          {Links.map((value, key) => {
            return (
              <Route
                path={value.url}
                key={key}
                component={value.component}
              />
            )
          })}
        </Switch>
      </BrowserRouter>
    </Row>
  );
}


export default App;
