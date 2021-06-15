import React, { useEffect, useState } from "react";

import projectApi from "../../Api/ProjectApi";
import { createNotification } from "../../components/Notification/Notification";
import { ToastContainer } from "react-toastify";
import Project from "./Project";
import "./Project.css";
import { useLoading, ThreeDots } from "@agney/react-loading";
import CountProject from "./CountProject";
import ModalAdd from "./ModalAdd";
import { Col, Container, Row } from "react-bootstrap";

function ListProject(props) {
    const [projects, setProjects] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);
    const { containerProps, indicatorEl } = useLoading({
        loading: isloading,
        indicator: <ThreeDots width="50" />,
    });
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
                    return;
                }

                setCount(response.countProject);
                setProjects(response.projects);
                setIsLoading(!isloading);
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
            {isloading && (
                <section className="loading" {...containerProps}>
                    {indicatorEl} {/* renders only while loading */}
                </section>
            )}
            <div className="count-Project">
                <CountProject count={count} />
            </div>
            <ModalAdd addProjectClick={handleAddClick} />
            {projects.countProject}
            {/* <ul className="projects-list"> */}
            <ToastContainer />
            <Container>
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
