import React from 'react';
import ReactDOM from "react-dom";
import '../stylesheets/modal.scss';

class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
            <div className="modal-main" ref={this.setWrapperRef}>
                <section>
                    {this.props.children}
                </section>
            </div>
        )
    }
}

export default CardModal;