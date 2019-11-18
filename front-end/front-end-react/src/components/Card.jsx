import React from 'react';
import '../stylesheets/card.scss';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    }

    render() {
        return (
            <div class="card">
                <div class="status-green"></div>
                <div class="card-content">
                    Testing testing 123!
                </div>
            </div>
          //  <div style={{backgroundColor: 'red', height: '100px', width: '100px'}}></div>
          //<div class="author"><i class="fa fa-user-circle-o" aria-hidden="true"></i></div>

        )
    }
}

export default Card;