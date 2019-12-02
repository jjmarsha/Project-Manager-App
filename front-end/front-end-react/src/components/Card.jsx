import React from 'react';
import '../stylesheets/card.scss';
import ReactDOM from "react-dom";
import CardModal from './CardModal';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const grid = 8;


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: "Test Task",
            description: "A test task",
            taskID: 1234,
            tags: "complete",
            asignees: [
                "Christopher Ting", "Nicole Ng"
            ],
            draggable: {
                key: props.key,
                draggableId: props.draggableId,
                index: props.index,
                content: props.content
            }
        }
        this.myRef = React.createRef();
        this.updateFromServlet = this.updateFromServlet.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.lastMouseDown = 0;
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
    }
    

    updateFromServlet(data) {
        this.setState({
            name: data.title,
            description: data.description,
            taskID: data.taskID,
            tags: data.tags,
            asignees: data.asignees
        });
    }

    showModal = () => {
        this.setState( {
            show: true
        });
    };

    hideModal = () => {
        this.setState( {
            show: false
        });
    };

    handleMouseDown(event) {
        if (this.myRef.current != null && this.myRef.current.contains(event.target)) {
            console.log('Mouse Down');
            var timeNow = (new Date()).getTime();
            this.lastMouseDown = timeNow;
        }
    }

    handleMouseUp(event) {
        var items = ['todo', 'inprogress', 'completed'];
        var item = items[Math.floor(Math.random()*items.length)];
       if (this.myRef.current != null && this.myRef.current.contains(event.target)) {
           var timeNow = (new Date()).getTime();
           if ((timeNow - this.lastMouseDown) <= 250){
               this.setState({
                   tags: item
               })
               this.showModal();
           }
       }
    }

    render() {




        var name = "status ";
        if (this.state.tags === 'todo') name += 'red';
        if (this.state.tags === 'inprogress') name += 'yellow';
        if (this.state.tags === 'completed') name += 'green';

        const config = {
            
        }
        return (
            <Draggable key={this.state.draggable.id} draggableId={this.state.draggable.draggableId} index={this.state.draggable.index}>
                {(provided, snapshot) => (
                     <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="card" ref={this.myRef}>
                            <div className={name}></div>
                            <div className="card-content">
                                {this.state.draggable.content}
                            </div>
                            <div className="assignee">
                                {this.state.asignees.map((asignee) => asignee) + " "}
                            </div>

                                <CardModal show={this.state.show} handleClose={this.hideModal}>
                                    <p> {this.state.name} </p>
                                </CardModal>
                        </div>

                    </div>
                )}
                
            </Draggable>

        )
    }
}

export default Card;