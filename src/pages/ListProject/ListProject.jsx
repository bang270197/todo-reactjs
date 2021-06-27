import React, { useEffect, useState } from "react";

import projectApi from "../../Api/ProjectApi";
import { createNotification } from "../../components/Notification/Notification";
import { ToastContainer } from "react-toastify";
import Project from "./Project";
import "./Project.css";
// import { useLoading, ThreeDots } from "@agney/react-loading";
import UpdateUser from "../../components/Modal/UserModal/UpdateUser";
import Pagination from "../../pages/Pagination/Pagination";
import ModalAdd from "../../components/Modal/ProjectModal/AddProject";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
function ListProject(props) {
    const [projects, setProjects] = useState([]);
    // const [isloading, setIsLoading] = useState(0);
    // const [status, setStatus] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 8,
        totalRows: 1,
    });
    const [filters, setFilters] = useState({
        page: 1,
        limit: 8,
    });
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                // const params = {
                //     limit: 8,
                //     page: 1,
                // };
                const response = await projectApi.getAll(filters);

                if (response.code !== "200") {
                    createNotification("error", response.message);
                } else {
                    setShow(true);
                    setCount(response.countProject);
                    setProjects(response.projects);
                    setPagination(response.pagination);
                    // setIsLoading(false);
                }
            } catch (error) {
                console.log("Failed to fetch product list: ", error);
            }
        };

        fetchProductList();
    }, [filters, count]);

    function handlePageChange(newPage) {
        setFilters({ ...filters, page: newPage });
    }

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
    };
    const handleUpdateStaus = async (id) => {
        const response = await projectApi.updateStaus(id);
        if (response.code !== "200") {
            createNotification("error", response.message);
        } else {
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
            <p className="spinner">
                {/* {isloading && <Spinner animation="border" />} */}
                {count === 0 && "Chưa có project nào"}
            </p>
            {projects.countProject}
            <ToastContainer />

            <div>
                <UpdateUser />
            </div>

            <Container className="container">
                {/* {show === true && ( */}
                <Row>
                    <Col xs={12} sm={3} md={3}>
                        <ModalAdd display addProjectClick={handleAddClick} />
                    </Col>
                    <Col xs={12} sm={3} md={3} className="total-project">
                        Project hiện có: {count}
                    </Col>
                    <Col xs={12} sm={3} md={3}></Col>
                    <Col xs={12} sm={3} md={3}>
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    </Col>
                    {/* <Col xs={12} sm={4} md={3} className="total-project"></Col>
                    <Col xs={12} sm={4} md={3} className="total-project">
                        
                    </Col> */}
                </Row>
                {/* )} */}

                <Row>
                    {count === 0 ? (
                        <p className="spinner">Chưa có project nào</p>
                    ) : (
                        projects.map((item, index) => (
                            <Col sm={12} md={4} lg={3} xs={12} key={index}>
                                <Project
                                    project={item}
                                    updateStauts={handleUpdateStaus}
                                    handleUpdatePro={handleUpdate}
                                    handleDeletePro={handleDelete}
                                />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
            {/* </ul> */}
        </>
    );
}

export default ListProject;
