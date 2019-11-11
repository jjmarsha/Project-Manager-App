import React from 'react';
import {Links} from '../SidebarLinks';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'reactstrap';

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
            <div>
                <div>Top of SideBar Placeholder Div</div>
                <ListGroup>
                    {Links.map((value, keys) => {
                        return (
                            <ListGroupItem
                                tag="a"
                                href={value.url}
                                action
                            >
                            {value.text}   
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </div>
        )
    }
}