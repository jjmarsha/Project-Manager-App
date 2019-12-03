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
        document.addEventListener('mousedown', this.handleClick);
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
        var params = {
            taskName: taskName,
            description: description,
            status: status,
            projectID: window.localStorage.getItem("projectID"),
            button: "edit-task",
            date: this.props.date,
            taskID: this.props.taskID
        }

        var endpoint = "http://localhost:8080/johnzkan_CSCI201L_final_project/taskServlet?";
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + "=" + esc(params[k]))
            .join('&');

        axios.get(endpoint + query)
            .then(result => {
                //this.props.onCardInfoChange();
            })
            .catch(error => {
                console.log(error);
            })
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