import React from "react";
import {Col} from "reactstrap";

export default class Pages extends React.Component {
    render() {
        return (
            <Col style={{width: "85%"}}>
                {this.props.children}
            </Col>
        )
    }
}