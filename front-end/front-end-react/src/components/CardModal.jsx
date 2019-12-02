import React from 'react';
import ReactDOM from "react-dom";
import '../stylesheets/modal.scss';
import axios from 'axios';


const inputParsers = {
    date(input) {
      const [month, day, year] = input.split('/');
      return `${year}-${month}-${day}`;
    },
    uppercase(input) {
      return input.toUpperCase();
    },
    number(input) {
      return parseFloat(input);
    },
  };

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

    componentWillReceiveProps(nextProps) {
        this.setState({
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
        console.log(this.state.description);
    }

    onChangeStatus(event) {
        event.preventDefault();

        console.log(event.target.value);
        this.setState({
            status: event.target.value
        })
    }



    handleSubmit(event) {
        event.preventDefault();
        const {taskName, description, status} = this.state;

        console.log(taskName);
        console.log(description);
        console.log(status);
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
        })

        /*axios.get(`http://localhost:8080/johnzkan_CSCI201L_final_project/displayProjectwithTask?projectID=${projectID}`)
        .then(results => {
            var todo = [];
            var inprogress = [];
            var completed = [];

            for (let index = 0; index < results.data.length; index++) {
                var task = results.data[index];
                if (task.status === "0") todo.push(task);
                else if (task.status === "1") inprogress.push(task);
                else if (task.status === "2") completed.push(task);
            }

            todo = giveID(todo, todo.length, 0);
            inprogress = giveID(inprogress, inprogress.length, 10);
            completed = giveID(completed, completed.length, 20);
            console.log(todo);
            
            this.setState({
                todo: todo,
                inprogress: inprogress,
                completed: completed
            })
          console.log(results);
        }); */
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