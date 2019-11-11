import React from 'react';

const TaskList = [
    {
        taskName: "Buy Groceries",
        crossed: false,
    },
    {
        taskName: "Feed Doggy",
        crossed: false,
    },
    {
        taskName: "Eat food",
        crossed: false,
    }
]

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: TaskList,
        }
    }

    render() {
        return(
            <div>
                <h1>To Do List</h1>
                <form className="input-form">
                    <input type="text" name="add-id" placeholder="What's the plan?"/>
                </form>
                <ul id="u-list">
                    {}
        {/* in the above statement, iterate through a map on the taskList */}
                </ul>
            </div>
        )
    }
}

export default TodoList;