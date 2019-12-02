import React from 'react';
import {Links} from '../../PageLinks';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'reactstrap';
import Sidebar from '../Sidebar/Sidebar';
import {NavLink} from "react-router-dom";
//{Redirect, Route, RouteComponentProps, Switch, withRouter}
import "./Navigation.scss";

//We can later implement to allow the user to change color of sidebar
const currentStyle = "info";
/*
    "success" : green
    "danger" : red
    "warning" : yellow
    "info" : blue
*/

export default class NavigationSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        window.localStorage.setItem("session", "");
        this.props.handleSession("");
    }

    render() {
        return(
            <Sidebar background={currentStyle}>
                Board
                {/* <div></div>
                <ListGroup>
                    {Links.map((value, index) => {
                        return (
                            <ListGroupItem
                                key={index}
                                tag={NavLink}
                                action
                                to={value.url}
                                color={currentStyle}
                                className="List-Item-custom"
                                >
                            {value.text}   
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>*/}
                {this.props.Dev_NoLogin ? <div onClick={this.handleClick}>reset</div> : null}
            </Sidebar>
        )
    }
}