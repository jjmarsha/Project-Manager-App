import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Page from "../../components/Page";
import Card from "../../components/Card";

const grid = 8;


//data gen 
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default class  Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
      selected: getItems(5, 10)
    };
    console.log(this.state.items);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.id2List = {
      droppable: 'items',
      droppable2: 'selected'
    }

    this.getList = this.getList.bind(this);
  }

  getList(id) {
    return this.state[this.id2List[id]];
  }

  onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
        const items = reorder(
            this.getList(source.droppableId),
            source.index,
            destination.index
        );

        let state = { items };

        if (source.droppableId === 'droppable2') {
            state = { selected: items };
        }

        this.setState(state);
    } else {
        const result = move(
            this.getList(source.droppableId),
            this.getList(destination.droppableId),
            source,
            destination
        );

        this.setState({
            items: result.droppable,
            selected: result.droppable2
        });
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
        <Page>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Card key={item.id} draggableId={item.id} index={index} content={item.content}>
                  </Card>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Page>
    );
  }
}
