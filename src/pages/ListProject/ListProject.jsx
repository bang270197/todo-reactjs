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
    const [isloading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

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
                    setCount(response.countProject);
                    setProjects(response.projects);
                    setIsLoading(!isloading);
                }
            } catch (error) {
                console.log("Failed to fetch product list: ", error);
            }
        };

        fetchProductList();
    }, []);
    function handleAddClick(data) {
        const newProjects = [...projects, data.project];
        setProjects(newProjects);
        setCount(count + 1);
    }
    return (
        <>
            <div className="spinner">
                {isloading && <Spinner animation="border" />}
            </div>
            {projects.countProject}
            <ToastContainer />
            <Container className="container">
                <Row>
                    <Col xs={3}>
                        <ModalAdd addProjectClick={handleAddClick} />
                    </Col>
                    <Col xs={3}>Tổng số project hiện có: {count}</Col>
                </Row>
                <Row>
                    {projects.map((item, index) => (
                        <Col xs={3} key={index}>
                            <Project project={item} />
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* </ul> */}
        </>
    );
}

export default ListProject;
