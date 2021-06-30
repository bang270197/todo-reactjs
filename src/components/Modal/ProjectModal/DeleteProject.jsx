import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import projectApi from "../../../Api/ProjectApi";
import { createNotification } from "../../Notification/Notification";
DeleteProject.propTypes = {};

function DeleteProject(props) {
    const { id, handleDelete } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClickDelete = async (id) => {
        const response = await projectApi.delete(id);
        if (response.data.code === "200") {
            setShow(!show);
            createNotification("success", response.data.message);
            handleDelete(response.data);
        } else {
            setShow(!show);
            createNotification("error", response.data.message);
        }
    };
    return (
        <>
            <li className="fas fa-trash" onClick={handleShow}></li>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa khóa học?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => handleClickDelete(id)}
                    >
                        Xóa
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteProject;
