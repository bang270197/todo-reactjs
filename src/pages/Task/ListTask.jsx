import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createNotification } from "../../components/Notification/Notification";
import taskApi from "../../Api/TaskClient";
import "./Task.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import AddTask from "../../components/Modal/TaskModal/AddTask";
import AddUserToTask from "../../components/Modal/TaskModal/AddUserToTask";
import { ToastContainer } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
function ListTask(props) {
    const { id } = useParams();
    const [columns, setColumns] = useState({});
    const [status, setStatus] = useState("");
    const [addUser, setAddUser] = useState({});
    const onDragEnd = async (result, columns, setColumns) => {
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
            const data = {
                status: destColumn.value,
            };
            const response = await taskApi.updateStatus(
                data,
                result.draggableId
            );
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

    const onClickAdd = (data) => {
        const status = data.body.status;
        Object.entries(columns).map(([columnId, column], index) => {
            if (status === column.value) {
                column.items.push(data.body);
            }
        });
        setStatus(columns);
    };
    const onClickDelete = async (id) => {
        const response = await taskApi.delete(id);
        if (response.code !== "200") {
            createNotification("error", response.message);
        } else {
            setStatus(response.code);
            createNotification("success", response.message);
        }
    };

    const clickAddUser = (data) => {
        setAddUser(data);
    };

    useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const response = await taskApi.getAll(id);

                if (response.code !== "200") {
                    createNotification("error", response.message);
                } else {
                    var todo = response.body.filter(function (item) {
                        return item.status === "new";
                    });
                    var progress = response.body.filter(function (item) {
                        return item.status === "progress";
                    });
                    var done = response.body.filter(function (item) {
                        return item.status === "done";
                    });
                    const columnFromBackend = {
                        [uuidv4()]: {
                            name: "Todo",
                            value: "new",
                            items: todo,
                        },
                        [uuidv4()]: {
                            name: "Progress",
                            value: "progress",
                            items: progress,
                        },
                        [uuidv4()]: {
                            name: "Done",
                            value: "done",
                            items: done,
                        },
                    };
                    setColumns(columnFromBackend);
                }
            } catch (error) {
                console.log("Failed to fetch product list: ", error);
            }
        };

        fetchTaskList();
    }, [status, addUser]);

    return (
        <div className="body-list-task">
            <Container className="container">
                <Row>
                    <Col md={4} xs={12}>
                        <div className="btn-add">
                            <AddTask handleClickAdd={onClickAdd} />
                        </div>
                    </Col>
                </Row>

                <ToastContainer />
                <div className="body-task">
                    <Row>
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
                                                // alignItems: "center",
                                            }}
                                            key={index}
                                        >
                                            <Col md={4} xs={12}>
                                                <h4 className="title-column">
                                                    {column.name}
                                                </h4>
                                                <div style={{ margin: 20 }}>
                                                    <Droppable
                                                        droppableId={columnId}
                                                        key={columnId}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => {
                                                            return (
                                                                <div
                                                                    {...provided.droppableProps}
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    style={{
                                                                        background:
                                                                            snapshot.isDraggingOver
                                                                                ? "#c4c7d1"
                                                                                : "#ebecf0",
                                                                        padding: 3,
                                                                        overflow:
                                                                            "scroll",
                                                                        width: 250,
                                                                        height: 500,
                                                                    }}
                                                                    className="column-div"
                                                                >
                                                                    {column.items.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
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
                                                                                                            ? "#9abbf4"
                                                                                                            : "#ffffff",
                                                                                                    color: "black",
                                                                                                    position:
                                                                                                        "relative",
                                                                                                    ...provided
                                                                                                        .draggableProps
                                                                                                        .style,
                                                                                                }}
                                                                                            >
                                                                                                <i
                                                                                                    className="fas fa-minus-circle"
                                                                                                    onClick={() =>
                                                                                                        onClickDelete(
                                                                                                            item._id
                                                                                                        )
                                                                                                    }
                                                                                                ></i>
                                                                                                <i
                                                                                                    className={
                                                                                                        item.priority ===
                                                                                                        "high"
                                                                                                            ? "fas fa-long-arrow-alt-up high"
                                                                                                            : item.priority ===
                                                                                                              "medium"
                                                                                                            ? "fas fa-long-arrow-alt-up medium"
                                                                                                            : item.priority ===
                                                                                                              "low"
                                                                                                            ? "fas fa-long-arrow-alt-up low"
                                                                                                            : ""
                                                                                                    }
                                                                                                ></i>
                                                                                                <AddUserToTask
                                                                                                    id={
                                                                                                        id
                                                                                                    }
                                                                                                    taskId={
                                                                                                        item._id
                                                                                                    }
                                                                                                    handleAddUser={
                                                                                                        clickAddUser
                                                                                                    }
                                                                                                />
                                                                                                {typeof item.user ===
                                                                                                "undefined" ? (
                                                                                                    <p className="alert-user-null">
                                                                                                        Chưa
                                                                                                        gán
                                                                                                        user
                                                                                                    </p>
                                                                                                ) : (
                                                                                                    <p className="alert-user-null">
                                                                                                        {
                                                                                                            item
                                                                                                                .user
                                                                                                                .username
                                                                                                        }
                                                                                                    </p>
                                                                                                )}

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
                                                                    {
                                                                        provided.placeholder
                                                                    }
                                                                </div>
                                                            );
                                                        }}
                                                    </Droppable>
                                                </div>
                                            </Col>
                                        </div>
                                    );
                                }
                            )}
                        </DragDropContext>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default ListTask;
