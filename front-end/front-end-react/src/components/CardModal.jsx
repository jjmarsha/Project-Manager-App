import React from 'react';
import ReactDOM from "react-dom";
import '../stylesheets/modal.scss';

class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            content: this.props.content
        }
        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            content: nextProps.content
        })
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    handleClick(event) {
        if (this.wrapperRef && this.props.show && !this.wrapperRef.contains(event.target)) {
            console.log('hide component');
            this.props.handleClose();
        }
    }

    hideModal = () => {
        this.props.show = false;
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="overlay">
                <div className="modal-main" ref={this.setWrapperRef}>
                    <section>
                        {this.state.content.taskName}
                        {this.state.content.description}
                        {this.state.content.status}
                        {this.props.children}
                    </section>
                </div>
            </div>

        )
    }
}

export default CardModal;