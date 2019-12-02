import React from 'react';
import Page from "../../components/Page";
import axios from "axios";
// import io from "sock    "

let messages = [];
let socket;

export default class Messages extends React.Component {


    componentDidMount() {
        // socket = new WebSocket("ws://localhost:6789");
        // console.log(socket);

    }

    handleClick() {
        axios
        .options("http://localhost:8080/johnzkan_CSCI201L_final_project/displayProjectwithTask")
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        })
    }


    render() {
        return(
            <Page>
                <div onClick={this.handleClick}>hiiiiiiiiiiiiii</div>
            </Page>
        )
    }
}