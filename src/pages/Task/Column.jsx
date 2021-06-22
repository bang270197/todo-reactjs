import React from "react";
import PropTypes from "prop-types";
import "./Task.css";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function Column(props) {
    const { columnId, column } = props;

    return (
        <h2>hello</h2>
        // <div
        //     style={{
        //         display: "flex",
        //         flexDirection: "column",
        //         alignItems: "center",
        //     }}
        //     key={columnId}
        // >
        //     <h2>{column.name}</h2>
        //     <div style={{ margin: 8 }}>
        //         <Droppable droppableId={columnId} key={columnId}>
        //             {(provided, snapshot) => {
        //                 return (
        //                     <div
        //                         {...provided.droppableProps}
        //                         ref={provided.innerRef}
        //                         style={{
        //                             background: snapshot.isDraggingOver
        //                                 ? "lightblue"
        //                                 : "lightgrey",
        //                             padding: 4,
        //                             width: 250,
        //                             minHeight: 500,
        //                         }}
        //                     >
        //                         {column.items.map((item, index) => {
        //                             return (
        //                                 <Draggable
        //                                     key={item.id}
        //                                     draggableId={item.id}
        //                                     index={index}
        //                                 >
        //                                     {(provided, snapshot) => {
        //                                         return (
        //                                             <div
        //                                                 ref={provided.innerRef}
        //                                                 {...provided.draggableProps}
        //                                                 {...provided.dragHandleProps}
        //                                                 style={{
        //                                                     userSelect: "none",
        //                                                     padding: 16,
        //                                                     margin: "0 0 8px 0",
        //                                                     minHeight: "50px",
        //                                                     backgroundColor:
        //                                                         snapshot.isDragging
        //                                                             ? "#263B4A"
        //                                                             : "#456C86",
        //                                                     color: "white",
        //                                                     ...provided
        //                                                         .draggableProps
        //                                                         .style,
        //                                                 }}
        //                                             >
        //                                                 {item.content}
        //                                             </div>
        //                                         );
        //                                     }}
        //                                 </Draggable>
        //                             );
        //                         })}
        //                         {provided.placeholder}
        //                     </div>
        //                 );
        //             }}
        //         </Droppable>
        //     </div>
        // </div>
    );
}

export default Column;
