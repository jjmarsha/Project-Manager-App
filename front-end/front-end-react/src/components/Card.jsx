import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    }

    render() {
        return (
            <div style={{backgroundColor: 'red', height: '100px', width: '100px'}}></div>
        )
    }
}

export default Card;