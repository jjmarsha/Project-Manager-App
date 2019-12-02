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
            taskName: this.props.content.taskName,
            description: this.props.content.description,
            taskID: 1234,
            status: this.props.content.status,
            asignees: [
                "Christopher Ting", "Nicole Ng"
            ],
            draggable: {
                key: props.key,
                draggableId: props.draggableId,
                index: props.index,
            }
        }
        
        this.myRef = React.createRef();
        this.updateFromServlet = this.updateFromServlet.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.lastMouseDown = 0;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            taskName: nextProps.content.taskName,
            description: nextProps.content.description,
            status: nextProps.content.status,
            draggable: {
                key: nextProps.key,
                draggableId: nextProps.draggableId,
                index: nextProps.index,
            }
        
        });
    }
    componentDidMount() {
        console.log(this.props);
        

        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.setState({
                show: false,
                taskName: this.props.content.taskName,
                description: this.props.content.description,
                taskID: 1234,
                status: this.props.content.status,
                asignees: [
                    "Christopher Ting", "Nicole Ng"
                ],
                draggable: {
                    key: this.props.key,
                    draggableId: this.props.draggableId,
                    index: this.props.index,
                }
            
        });
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
            console.log(this.props.content);
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
               this.showModal();
           }
       }
    }

    render() {




        var name = "status ";
        if (this.state.status === '0') name += 'red';
        if (this.state.tags === '1') name += 'yellow';
        if (this.state.tags === '2') name += 'green';

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
                                {this.state.taskName}
                            </div>
                            <div className="assignee">
                                {this.state.asignees.map((asignee) => asignee) + " "}
                            </div>

                                <CardModal show={this.state.show} handleClose={this.hideModal} content={this.props.content}>
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