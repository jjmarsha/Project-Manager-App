import React from 'react';
import {Links} from '../PageLinks';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'reactstrap';
import Sidebar from './Sidebar/Sidebar';
import {NavLink} from "react-router-dom";
//{Redirect, Route, RouteComponentProps, Switch, withRouter}

export default class NavigationSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentPage: "",
        }

        this.changePage = this.changePage.bind(this);
    }

    changePage = () => {
        
    }

    render() {
        return(
            <Sidebar>
                <div></div>
                <ListGroup>
                    {Links.map((value, index) => {
                        return (
                            <ListGroupItem
                                key={index}
                                tag={NavLink}
                                action
                                to={value.url}>
                            {value.text}   
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </Sidebar>
        )
    }
}