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
            tags: [
                "In-Progress", "Important"
            ],
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
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateFromServlet = this.updateFromServlet.bind(this);
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


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClick(event) {
        if (this.wrapperRef && this.wrapperRef.contains(event.target)) {
           this.showModal();
        }
    }

    render() {
        return (
            <Draggable key={this.state.draggable.id} draggableId={this.state.draggable.draggableId} index={this.state.draggable.index}>
                {(provided, snapshot) => (
                     <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //     snapshot.isDragging,
                        //     provided.draggableProps.style
                        //     )}
                    >
                        <div className="card">
                            <div className="status-green"></div>
                            <div className="card-content">
                                {this.state.draggable.content}
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
                        //     {/* <CardModal show={this.state.show} handleClose={this.hideModal}>
            //             <p> {this.state.name} </p>
            //     </CardModal> */}
        )
    }
}

export default Card;