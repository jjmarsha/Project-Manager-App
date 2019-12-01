import React from 'react';
import '../stylesheets/card.scss';
import ReactDOM from "react-dom";
import CardModal from './CardModal';


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            name: "Beginner Tasks",
            descript: "Description",
            taskId: 13232,
            show: false,
            category: "optional"
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
            <div className="card" ref={this.setWrapperRef}>
                <CardModal show={this.state.show} handleClose={this.hideModal}>
                    <p> {this.state.taskId} </p>
                </CardModal>
                <div className="status-green"></div>
                <div className="card-content">
                    Testing testing 123!
                </div>
            </div>
        )
    }
}

export default Card;