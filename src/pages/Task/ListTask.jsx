import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { createNotification } from "../../components/Notification/Notification";
import taskApi from "../../Api/TaskClient";
import "./Task.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import { Col, Container, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import AddTask from "../../components/Modal/TaskModal/AddTask";

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

function ListTask(props) {
    const { id } = useParams();
    const [columns, setColumns] = useState({});
    useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const response = await taskApi.getAll(id);

                if (response.code !== "200") {
                    createNotification("error", response.message);
                } else {
                    // setCount(response.countProject);
                    // setTask(response.body);
                    var todo = response.body.filter(function (item) {
                        return item.status === "new";
                    });
                    var progress = response.body.filter(function (item) {
                        return item.status === "progress";
                    });
                    var done = response.body.filter(function (item) {
                        return item.status === "done";
                    });
                    // setTodo(todo);
                    // setProgress(progress);
                    // setDone(done);
                    const columnFromBackend = {
                        [uuidv4()]: {
                            name: "Todo",
                            items: todo,
                        },
                        [uuidv4()]: {
                            name: "In Progress",
                            items: progress,
                        },
                        [uuidv4()]: {
                            name: "Done",
                            items: done,
                        },
                    };
                    setColumns(columnFromBackend);
                    // createNotification("success", response.message);
                }
            } catch (error) {
                console.log("Failed to fetch product list: ", error);
            }
        };

        fetchTaskList();
    }, []);

    return (
        <>
            <div className="btn-add">
                <AddTask />
            </div>
            <div className="body-task">
                <DragDropContext
                    onDragEnd={(result) =>
                        onDragEnd(result, columns, setColumns)
                    }
                >
                    {Object.entries(columns).map(
                        ([columnId, column], index) => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                    key={index}
                                >
                                    {columnId}
                                    <h2>{column.name}</h2>f
                                    <div style={{ margin: 8 }}>
                                        <Droppable
                                            droppableId={columnId}
                                            key={columnId}
                                        >
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            background:
                                                                snapshot.isDraggingOver
                                                                    ? "lightblue"
                                                                    : "lightgrey",
                                                            padding: 4,
                                                            width: 250,
                                                            minHeight: 500,
                                                        }}
                                                    >
                                                        {column.items.map(
                                                            (item, index) => {
                                                                return (
                                                                    <Draggable
                                                                        key={
                                                                            item._id
                                                                        }
                                                                        draggableId={
                                                                            item._id
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                    >
                                                                        {(
                                                                            provided,
                                                                            snapshot
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    ref={
                                                                                        provided.innerRef
                                                                                    }
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={{
                                                                                        userSelect:
                                                                                            "none",
                                                                                        padding: 16,
                                                                                        margin: "0 0 8px 0",
                                                                                        minHeight:
                                                                                            "50px",
                                                                                        backgroundColor:
                                                                                            snapshot.isDragging
                                                                                                ? "#263B4A"
                                                                                                : "#456C86",
                                                                                        color: "white",
                                                                                        ...provided
                                                                                            .draggableProps
                                                                                            .style,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        item.title
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                );
                                                            }
                                                        )}
                                                        {provided.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </DragDropContext>
            </div>
        </>
    );
}

export default ListTask;
