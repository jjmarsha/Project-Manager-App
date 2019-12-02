import React from 'react';
import './Sidebar.scss';
import {Col} from 'reactstrap';

const Sidebar = (props) => {
    return (
        <div className={"sidebar " + props.background}>
            {props.children}
        </div>
    )
}

export default Sidebar;