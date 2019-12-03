import React from 'react';
import ReactDOM from "react-dom";
import shallowCompare from 'react-addons-shallow-compare';

import '../../stylesheets/modal.scss';
import axios from 'axios';

class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);

        this.modalReference = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            taskName: this.props.taskName,
            description: this.props.description,
            status: this.props.status
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((nextProps.taskName != this.props.taskName) || (nextState.taskName != this.state.taskName)) return true;
        if ((nextProps.description != this.props.description) || (nextState.description != this.state.description)) return true;
        if ((nextProps.status != this.props.status) || (nextState.status != this.state.status)) return true;
        if (this.props.show != nextProps.show) return true;
        return false;
    }

    componentDidMount() {
        this.clickListener = document.addEventListener('mousedown', this.handleClick);
    }
    componentWillUnmount() {
        this.clickListener.removeEventListener();
    }
    handleClick(event) {
        if (this.modalReference.current != null && this.props.show && !this.modalReference.current.contains(event.target)) {
            this.props.handleModalClose();
        }
    }

    onChangeTaskName(event) {
        event.preventDefault();
        this.setState({
            taskName: event.target.value
        })
    }

    onChangeDescription(event) {
        event.preventDefault();

        this.setState({
            description: event.target.value
        })
    }

    onChangeStatus(event) {
        event.preventDefault();
        this.setState({
            status: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        const {taskName, description, status} = this.state;
        const endpoint = "http://localhost:8080/johnzkan_CSCI201L_final_project/taskServlet";
        let parameters = "";
        parameters += `?taskName=${this.state.taskName}`;
        parameters += `&description=${this.state.description}`;
        parameters += `&status=${this.state.status}`;
        parameters += `&taskID=${this.props.taskID}`;
        parameters += `&date=${this.props.date}`;
        parameters += `&projectID=${window.localStorage.getItem("projectID")}`;
        parameters += `&button=edit-task`;
        console.log(parameters);
        axios.get(endpoint + parameters)
            .then(result => {
                this.props.onCardInfoChange();
            });
        this.props.handleModalClose();

    }


    onDelete(event) {
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="overlay">
                <div className="modal-main" ref={this.modalReference} >
                    <button onClick={this.onDelete}>X</button>
                    <form className="taskForm" onSubmit={this.handleSubmit} >
                        <div><input className="modal-input" type="text" name="taskName" value={this.state.taskName} onChange={this.onChangeTaskName}/></div>
                        <div><input className="modal-input" type="text" name="description" value={this.state.description} onChange={this.onChangeDescription}/></div>
                        <div><input className="modal-input" type="text" name="status" value={this.state.status} onChange={this.onChangeStatus} /></div>
                        <div><input type="submit" name="button" value="Edit Task"></input></div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CardModal;