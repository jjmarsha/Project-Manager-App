import React from 'react';
import '../../stylesheets/card.scss';


import CardModal from './CardModal';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import {grid, getItemStyle} from '../../dragutil';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        
        this.myRef = React.createRef();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.lastMouseDown = 0;
    }

    componentDidMount() {        
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    showModal = () => { this.setState({
        show: true
    });};

    hideModal = () => { this.setState({
        show: false
    });};

    handleMouseDown(event) {
        if (this.myRef.current != null && this.myRef.current.contains(event.target)) {
            var timeNow = (new Date()).getTime();
            this.lastMouseDown = timeNow;
        }
    }

    handleMouseUp(event) {
       if (this.myRef.current != null && this.myRef.current.contains(event.target)) {
           var timeNow = (new Date()).getTime();
           if ((timeNow - this.lastMouseDown) <= 250){
               this.showModal();
           }
       }
    }

    render() {
        var name = "status ";
        if (this.props.status === '0') name += 'red';
        if (this.props.status === '1') name += 'yellow';
        if (this.props.status === '2') name += 'green';
        return (
            <Draggable 
                key={this.props.id} 
                draggableId={this.props.draggableId} 
                index={this.props.index}
            >
                {(provided, snapshot) => (
                     <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="card" ref={this.myRef}>
                            <div className={name}></div>
                            <div className="card-content"> {this.props.taskName} </div>
                            <div> {this.props.date} </div>

                            <CardModal show={this.state.show} 
                                handleModalClose={this.hideModal} 
                                taskName={this.props.taskName} 
                                description={this.props.description}
                                status={this.props.status}
                                date={this.props.date}
                                taskID={this.props.taskID}
                                onCardInfoChange={this.props.onCardInfoChange}
                            >
                            </CardModal>
                        </div>

                    </div>
                )}    
            </Draggable>
        )
    }
}

export default Card;