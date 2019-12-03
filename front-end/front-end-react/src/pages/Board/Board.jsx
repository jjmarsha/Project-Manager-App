import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

import Card from "../../components/Card/Card";
import CreateTask from "../../components/Card/CreateTask";
// import {grid, getItemStyle, getListStyle, generateItemData, reorder, formTaskData, move} from '../../dragutil';

 const grid = 8;

 const getItemStyle = (isDragging, draggableStyle) => (
    {
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        background: isDragging ? "lightgreen" : "grey",
        ...draggableStyle
    }
);

 const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});


// fake data generator

 const generateItemData = (count, offset = 0) => {
    return Array.from( {length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));
}



// Reorders Draggable List
 const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

 const formTaskData = (list, count, offset = 0) => {
    return Array.from( {length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        taskName: list[k].taskName,
        description: list[k].description,
        status: list[k].status,
        date: list[k].date,
        taskID: list[k].taskID
    }));
}

/**
 * Moves an item from one list to another list.
 */
 const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: generateItemData(10),
            inprogress:  generateItemData(5, 10),
            completed: generateItemData(7, 20),
            reload: false
        };
        this.columnNames = ['To-Do', 'In-Progress', 'Completed'];
        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        let projectID = 5;
        if (!this.props.guest) projectID = window.localStorage.getItem("projectID");
        const url = `http://localhost:8080/johnzkan_CSCI201L_final_project/displayProjectwithTask?projectID=${projectID}`;
        console.log(url);
        axios.get(url)
            .then(results => {
                console.log(results);
                var todo, inprogress, completed = [];
                for (let index = 0; index < results.data.length; index++) {
                    var task = results.data[index];
                    if (task.status === "0") todo.push(task);
                    else if (task.status === "1") inprogress.push(task);
                    else if (task.status === "2") completed.push(task);
                }
                todo = formTaskData(todo, todo.length, 0);
                inprogress = formTaskData(inprogress, inprogress.length, 10);
                completed = formTaskData(completed, completed.length, 20);
                this.setState({
                    todo: todo,
                    inprogress: inprogress,
                    completed: completed
                })
            });
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable1: 'todo',
        droppable2: 'inprogress',
        droppable3: 'completed'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) return;
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
            let state = { items };

            if (source.droppableId === 'droppable1') state = { todo: items };
            if (source.droppableId === 'droppable2') state = { inprogress: items };
            if (source.droppableId === 'droppable3') state = { completed: items };
            this.setState(state);
        } 
        else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            let sourceTask;
            if (source.droppableId === 'droppable1') sourceTask = this.state.todo[source.index];
            else if (source.droppableId === 'droppable2') sourceTask = this.state.inprogress[source.index];
            else if (source.droppableId === 'droppable3') sourceTask = this.state.completed[source.index];

            console.log(sourceTask);
            // const task = sourceTask.content;
            // const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            // let parameters = "";
            // parameters += "?taskName=" + task.taskName;
            // parameters += "&description='" + task.description +"'";
            // parameters += "&status=" + task.status;
            // parameters += "&projectID=" + window.localStorage.getItem("projectID");
            // parameters += "&button=edit-task";
            // parameters += "&date=" + date;

            // const new_parameters = encodeURIComponent(parameters);
    
            // const finalThing = "http://localhost:8080/johnzkan_CSCI201L_final_project/taskServlet" + (new_parameters);
            // console.log(finalThing);
    
            // axios.get(finalThing)
            // .then(results => {
            //     console.log(results);
            // })

            this.setState({
                todo: result.droppable != null ? result.droppable : this.state.todo,
                inprogress: result.droppable2 != null ? result.droppable2 : this.state.inprogress,
                completed: result.droppable3 != null ? result.droppable3 : this.state.completed
            });
        }
    };

    reload() {
        this.setState({
            reload: true
        });
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
          <React.Fragment>
          <div>
            <CreateTask onInfoChange={this.reload}>

            </CreateTask>
          </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable1">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <div className="header-bar">To-Do</div>
                            {this.state.todo.map((item, index) => (
                                <Card 
                                    key={item.id} 
                                    draggableId={item.id} 
                                    index={index}
                                    taskName={item.taskName}
                                    taskID={item.taskID}
                                    description={item.description}
                                    date={item.date}
                                    status={item.status}
                                    onCardInfoChange={this.reload}
                                >
                                </Card>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <div className="header-bar">In-Progress</div>
                            {this.state.inprogress.map((item, index) => (
                                <Card 
                                    key={item.id} 
                                    draggableId={item.id} 
                                    index={index}
                                    taskName={item.taskName}
                                    taskID={item.taskID}
                                    description={item.description}
                                    date={item.date}
                                    status={item.status}
                                    onCardInfoChange={this.reload}
                                >
                                </Card>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="droppable3">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <div className="header-bar">Completed</div>
                            {this.state.completed.map((item, index) => (
                                <Card 
                                    key={item.id} 
                                    draggableId={item.id} 
                                    index={index}
                                    taskName={item.taskName}
                                    taskID={item.taskID}
                                    description={item.description}
                                    date={item.date}
                                    status={item.status}
                                    onCardInfoChange={this.reload}
                                >
                                </Card>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            </React.Fragment>
        );
    }
}