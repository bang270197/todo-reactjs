import React, { useEffect, useState } from "react";

import projectApi from "../../Api/ProjectApi";
import { createNotification } from "../../components/Notification/Notification";
import { ToastContainer } from "react-toastify";
import Project from "./Project";
import "./Project.css";
// import { useLoading, ThreeDots } from "@agney/react-loading";
import ModalAdd from "../../components/Modal/ProjectModal/AddProject";
import { Col, Container, Row, Spinner } from "react-bootstrap";

function ListProject(props) {
    const [projects, setProjects] = useState([]);
    // const [isloading, setIsLoading] = useState(0);
    const [status, setStatus] = useState("");
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    limit: 12,
                    page: 1,
                };
                const response = await projectApi.getAll(params);

                if (response.code !== "200") {
                    createNotification("error", response.message);
                } else {
                    setShow(true);
                    setCount(response.countProject);
                    setProjects(response.projects);
                    // setIsLoading(false);
                }
            } catch (error) {
                console.log("Failed to fetch product list: ", error);
            }
        };

        fetchProductList();
    }, [status]);

    function handleAddClick(data) {
        const newProjects = [...projects, data.project];
        setProjects(newProjects);
        setCount(count + 1);
    }
    const handleUpdate = (data) => {
        const { thumbnail, title, detail } = data;
        const newProject = projects.filter((pro) => {
            if (pro._id === data._id) {
                pro.thumbnail = thumbnail;
                pro.title = title;
                pro.detail = detail;
                console.log(pro);
            }
            return pro;
        });

        setProjects(newProject);
    };
    const handleDelete = (data) => {
        const newProject = projects.filter((pro) => pro._id !== data._id);
        setProjects(newProject);
        setCount(count - 1);
        // setStatus(data);
    };
    const handleUpdateStaus = async (id) => {
        const response = await projectApi.updateStaus(id);
        if (response.code !== "200") {
            createNotification("error", response.message);
        } else {
            // setStatus(response.body.status);
            const newProject = projects.filter((pro) => {
                if (pro._id === id) {
                    pro.status = pro.status === "done" ? "undone" : "done";
                }
                return pro;
            });
            setProjects(newProject);
            createNotification("success", response.message);
        }
    };
    return (
        <>
            <div className="spinner">
                {/* {isloading && <Spinner animation="border" />} */}
                {count === 0 && "Chưa có project nào"}
            </div>
            {projects.countProject}
            <ToastContainer />
            <Container className="container">
                {/* {show === true && ( */}
                <Row>
                    <Col xs={6} sm={4} md={3}>
                        <ModalAdd display addProjectClick={handleAddClick} />
                    </Col>
                    <Col xs={6} sm={4} md={3}>
                        Tổng số project hiện có: {count}
                    </Col>
                </Row>
                {/* )} */}

                <Row>
                    {projects.map((item, index) => (
                        <Col sm={12} md={4} lg={3} xs={12} key={index}>
                            <Project
                                project={item}
                                updateStauts={handleUpdateStaus}
                                handleUpdatePro={handleUpdate}
                                handleDeletePro={handleDelete}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* </ul> */}
        </>
    );
}

export default ListProject;
