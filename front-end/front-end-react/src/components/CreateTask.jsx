
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/modal.scss';
import axios from 'axios';


export default class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            description: "",
            status: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);        
    }

    onChangeTaskName(event) {
        this.setState({
            taskName: event.target.value
        })
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    onChangeStatus(event) {
        this.setState({
            status: event.target.value
        })
    }

    handleSubmit(event) {
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        event.preventDefault();
        const {taskName, description, status} = this.state;
        console.log(this.state);
        let thing = "";
        thing += "?taskName=" + taskName;
        thing += "&description=" + description;
        thing += "&status=" + status;
        thing += "&projectID=" + window.localStorage.getItem("projectID");
        thing += "&date=" + date;
        thing += "&button=" + "create-task";
        axios.get("http://localhost:8080/johnzkan_CSCI201L_final_project/taskServlet" + thing)
        .then(results => {
            console.log(results);
        })
    }

    render() {
        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="create-form" >
                    <div className="create-title"><h3>Create a Task</h3></div>
                    <div><input className="create modal-input" type="text" name="taskName" value={this.state.taskName} onChange={this.onChangeTaskName} placeholder="Task Name"/></div>
                    <div><input className="create modal-input" type="text" name="description" value={this.state.description} onChange={this.onChangeDescription} placeholder="Task Description"/></div>
                    <div><input className="create modal-input" type="text" name="status" value={this.state.status} onChange={this.onChangeStatus} placeholder="Status"/></div>
                    <div><input type="submit" name="button" value="Create"></input></div>
                </form>
            </React.Fragment>
        )
    }
}