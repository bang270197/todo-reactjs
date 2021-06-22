import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 2px;
    margin-bottom: 8px;
`;
function Task(props) {
    const { task, index } = props;
    const grid = 8;
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid,
        margin: `10 5 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle,
    });
    return (
        <Draggable index={index} draggableId={task._id} key={task._id}>
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    {task.title}
                </Container>
            )}
        </Draggable>
    );
}

export default Task;
