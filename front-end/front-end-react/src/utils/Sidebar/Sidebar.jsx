import React from 'react';
import './Sidebar.scss';
import {Col} from 'reactstrap';

const Sidebar = (props) => {
    return (
        <Col lg="2" className="sidebar">
            {props.children}
        </Col>
    )
}

export default Sidebar;