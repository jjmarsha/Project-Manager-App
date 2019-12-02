import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Page from "../../components/Page";
import Card from "../../components/Card";
import axios from 'axios';
import CreateTask from "../../components/CreateTask";
// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const giveID = (list, count, offset) => {
    const new_arrry = Array.from( {length: count}, (v, k) => k).map(k => ({
        // date: list[k].date,
        // description: list[k].description,
        // status: list[k].status,
        // taskName: list[k].taskName,
        id: `item-${k + offset}`,
        content: list[k]
    }));
    return new_arrry;
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

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: getItems(10),
            inprogress:  getItems(5, 10),
            completed: getItems(7, 20)
        };
        this.columnNames = ['To-Do', 'In-Progress', 'Completed'];
    }

    componentDidMount() {
        const projectID = window.localStorage.getItem("projectID");
        if(!this.props.guest) {
            axios.get(`http://localhost:8080/johnzkan_CSCI201L_final_project/displayProjectwithTask?projectID=${projectID}`)
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
            });
        }
        else {
            axios.get(`http://localhost:8080/johnzkan_CSCI201L_final_project/displayProjectwithTask?projectID=5`)
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
            });
        }
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
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable1') {
              state = { todo: items };
            }

            if (source.droppableId === 'droppable2') {
                state = { inprogress: items };
            }

            if (source.droppableId === 'droppable3') {
              state = { completed: items}
            }



            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                todo: result.droppable != null ? result.droppable : this.state.todo,
                inprogress: result.droppable2 != null ? result.droppable2 : this.state.inprogress,
                completed: result.droppable3 != null ? result.droppable3 : this.state.completed
            });
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        var columns = [];
        columns.push(this.state.todo);
        columns.push(this.state.inprogress);
        columns.push(this.state.completed);
        return (
          <React.Fragment>
          <div>
            <CreateTask>

            </CreateTask>
          </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {columns.map((item, index) => (
                <Droppable droppableId={'droppable' + index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <div className="header-bar">{this.columnNames[index]}</div>
                      {columns[index].map((item, index) => (
                        <Card 
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                          content={item.content}
                        >

                        </Card>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
            </React.Fragment>
        );
    }
}
