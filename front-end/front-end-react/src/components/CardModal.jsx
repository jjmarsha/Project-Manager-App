import React from 'react';
import ReactDOM from "react-dom";
import '../stylesheets/modal.scss';
import axios from 'axios';

class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);

        this.state = {
            taskName: "",
            taskID: "",
            date: "",
            description: "",
            status: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    getDerivedStateFromProps(props, state) {
        if (props === this.props) return {};
        else return {
            taskName: props.taskName,
            taskID: props.taskID,
            date: props.date,
            description: props.description,
            status: props.status
        };
    }

    //called when the props change

    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props) return;
        else this.setState({
            taskName: nextProps.taskName,
            taskID: nextProps.taskID,
            date: nextProps.date,
            description: nextProps.description,
            status: nextProps.status,
        });
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentWillUpdate(nextProps, nextState) {
       /* console.log(nextProps);
        console.log(nextState); */
    }

    //once in component lifetime
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
        this.setState({
            taskName: this.props.taskName,
            taskID: this.props.taskID,
            date: this.props.date,
            description: this.props.description,
            status: this.props.status,
        });
    }

    handleClick(event) {
        if (this.wrapperRef && this.props.show && !this.wrapperRef.contains(event.target)) {
            this.props.handleClose();
        }
    }

    hideModal = () => {
        this.props.show = false;
    };

    handleButtonClick(event) {
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

        // console.log(taskName);
        // console.log(description);
        // console.log(status);

        let thing = "";     
        thing += "?taskName=" + taskName;
        thing += "&description=" + description;
        thing += "&status=" + status;
        thing += "&projectID=" + window.localStorage.getItem("projectID");
        thing += "&date=" + this.state.date;
        thing += "&button=" + "edit-task";
        axios.get("http://localhost:8080/johnzkan_CSCI201L_final_project/taskServlet" + thing)
        .then(results => {
            console.log(results);
        });
    }


    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="overlay">
                <div className="modal-main" ref={this.setWrapperRef} >
                    <form onSubmit={this.handleSubmit} >
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