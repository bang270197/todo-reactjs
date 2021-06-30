import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createNotification } from "../../components/Notification/Notification";
import taskApi from "../../Api/TaskClient";
import projectApi from "../../Api/ProjectApi";
import "./Task.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import AddTask from "../../components/Modal/TaskModal/AddTask";
import AddUserToTask from "../../components/Modal/TaskModal/AddUserToTask";
import { ToastContainer } from "react-toastify";
import { Col, Container, Row, Button } from "react-bootstrap";

function ListTask(props) {
    const { id } = useParams();
    const [all, setAll] = useState(false);
    const [columns, setColumns] = useState({});
    const [status, setStatus] = useState("");
    const [statusDelete, setStatusDelete] = useState({});
    const [addUser, setAddUser] = useState({});
    const [countTask, setcountTask] = useState(0);
    const [countUser, setCountUser] = useState(0);
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
        const status = data.data.body.status;
        Object.entries(columns).map(([columnId, column], index) => {
            if (status === column.value) {
                column.items.push(data.data.body);
            }
        });
        setStatus(columns);
    };
    const onClickDelete = async (id) => {
        const response = await taskApi.delete(id);
        if (response.data.code !== "200") {
            createNotification("error", response.data.message);
        } else {
            setStatusDelete(response.data.body);
            setcountTask(countTask - 1);
            createNotification("success", response.data.message);
        }
    };

    const clickAddUser = (data) => {
        setAddUser(data);
        setcountTask(countTask + 1);
    };

    useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const response = await taskApi.getAll(id);
                console.log(response);
                const count = await projectApi.countTaskAndUser(id);
                setCountUser(count.data.countUser);
                setcountTask(count.data.countTask);
                if (response.data.code !== "200") {
                    createNotification("error", response.data.message);
                } else {
                    var todo = response.data.body.filter(function (item) {
                        return item.status === "new";
                    });
                    var progress = response.data.body.filter(function (item) {
                        return item.status === "progress";
                    });
                    var done = response.data.body.filter(function (item) {
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
    }, [status, addUser, statusDelete, all]);
    const [user, setUser] = useState(localStorage.getItem("username"));

    const [choose, setChoose] = useState("");
    const handleChange = (event) => {
        console.log();
        setChoose(event.target.value);
    };
    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            // console.log(choose);
            switch (choose) {
                case "high":
                    let hightTodo;
                    let hightProgress;
                    let hightDone;
                    Object.entries(columns).map(([columnId, column], index) => {
                        // console.log(column.items);

                        if (column.name === "Todo") {
                            hightTodo = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                        if (column.name === "Progress") {
                            hightProgress = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                        if (column.name === "Done") {
                            hightDone = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                    });
                    const columnHight = {
                        [uuidv4()]: {
                            name: "Todo",
                            value: "new",
                            items: hightTodo,
                        },
                        [uuidv4()]: {
                            name: "Progress",
                            value: "progress",
                            items: hightProgress,
                        },
                        [uuidv4()]: {
                            name: "Done",
                            value: "done",
                            items: hightDone,
                        },
                    };

                    setColumns(columnHight);
                    break;
                case "medium":
                    let mediumTodo;
                    let mediumProgress;
                    let mediumDone;
                    Object.entries(columns).map(([columnId, column], index) => {
                        // console.log(column.items);

                        if (column.name === "Todo") {
                            mediumTodo = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                        if (column.name === "Progress") {
                            mediumProgress = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                        if (column.name === "Done") {
                            mediumDone = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                    });
                    const columnMedium = {
                        [uuidv4()]: {
                            name: "Todo",
                            value: "new",
                            items: mediumTodo,
                        },
                        [uuidv4()]: {
                            name: "Progress",
                            value: "progress",
                            items: mediumProgress,
                        },
                        [uuidv4()]: {
                            name: "Done",
                            value: "done",
                            items: mediumDone,
                        },
                    };

                    setColumns(columnMedium);
                    break;
                case "low":
                    let lowTodo;
                    let lowProgress;
                    let lowDone;
                    Object.entries(columns).map(([columnId, column], index) => {
                        // console.log(column.items);

                        if (column.name === "Todo") {
                            lowTodo = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                        if (column.name === "Progress") {
                            lowProgress = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                        if (column.name === "Done") {
                            lowDone = column.items.filter((item) => {
                                return item.priority === choose;
                            });
                        }
                    });
                    const columnLow = {
                        [uuidv4()]: {
                            name: "Todo",
                            value: "new",
                            items: lowTodo,
                        },
                        [uuidv4()]: {
                            name: "Progress",
                            value: "progress",
                            items: lowProgress,
                        },
                        [uuidv4()]: {
                            name: "Done",
                            value: "done",
                            items: lowDone,
                        },
                    };

                    setColumns(columnLow);
                    break;
                case "all":
                    setAll(!all);
                    break;
                default:
                    let searchTodo;
                    let searchProgress;
                    let searchDone;
                    Object.entries(columns).map(([columnId, column], index) => {
                        // console.log(column.items);

                        if (column.name === "Todo") {
                            searchTodo = column.items.filter((item) => {
                                if (typeof item.user !== "undefined") {
                                    return item.user.username === user;
                                }
                            });
                        }
                        if (column.name === "Progress") {
                            searchProgress = column.items.filter((item) => {
                                if (typeof item.user !== "undefined") {
                                    return item.user.username === user;
                                }
                            });
                        }
                        if (column.name === "Done") {
                            searchDone = column.items.filter((item) => {
                                if (typeof item.user !== "undefined") {
                                    return item.user.username === user;
                                }
                            });
                        }
                    });
                    const columnFromBackend = {
                        [uuidv4()]: {
                            name: "Todo",
                            value: "new",
                            items: searchTodo,
                        },
                        [uuidv4()]: {
                            name: "Progress",
                            value: "progress",
                            items: searchProgress,
                        },
                        [uuidv4()]: {
                            name: "Done",
                            value: "done",
                            items: searchDone,
                        },
                    };

                    setColumns(columnFromBackend);
                    break;
            }
        } catch (err) {
            console.log("Failed to fetch product list: ", err.message);
        }
    };
    return (
        <div className="body-list-task">
            <Container>
                <Row>
                    <Col md={3} xs={12}>
                        <div className="total-task">
                            Tổng số task hiện có:{countTask}
                        </div>
                    </Col>

                    <Col md={3} xs={12}>
                        <div className="total-task">
                            Tổng số User trong project:{countUser}
                        </div>
                    </Col>

                    <Col md={6} xs={12}>
                        <form className="form-search" onSubmit={handleSubmit}>
                            <select
                                className="select-search"
                                // value={user}
                                onChange={handleChange}
                            >
                                <option value="">--- Lọc theo ---</option>
                                <option value="all">All</option>
                                <option value={user}>Task của tôi</option>
                                {/* <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option> */}
                            </select>
                            <Button
                                className="btn btn-primary btn-search"
                                type="submit"
                            >
                                Search
                            </Button>
                        </form>
                    </Col>
                </Row>
            </Container>
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
