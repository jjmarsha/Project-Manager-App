


export const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => (
    {
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        background: isDragging ? "lightgreen" : "grey",
        ...draggableStyle
    }
);

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});


// fake data generator

export const generateItemData = (count, offset = 0) => {
    return Array.from( {length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));
}



// Reorders Draggable List
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const formTaskData = (list, count, offset = 0) => {
    return Array.from( {length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        taskName: list[k].taskName,
        description: list[k].description,
        status: list[k].status,
        date: list[k].date,
        taskID: list[k].taskID
    }));
}

/**
 * Moves an item from one list to another list.
 */
export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


