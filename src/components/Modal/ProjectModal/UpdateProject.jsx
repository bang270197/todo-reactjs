import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import projectApi from "../../../Api/ProjectApi";
import { createNotification } from "../../Notification/Notification";
UpdateProject.propTypes = {};
const schema = yup.object().shape({
    title: yup
        .string()
        .required("Title không được trống")
        .min(6, "Title không được nhỏ hơn 6 ký tự"),
    detail: yup
        .string()
        .required("Detail không được trống")
        .min(6, "Detail không được nhỏ hơn 6 ký tự"),
});
function UpdateProject(props) {
    const { project } = props;
    const [show, setShow] = useState(false);
    const handleClickShow = () => setShow(true);
    const handleClickClose = () => setShow(false);
    const imgUrl =
        "http://localhost:3001/static/" + project.thumbnail.split("/")[2];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        try {
            let thumbnail = data.thumbnail[0];
            const formData = new FormData();
            if (typeof thumbnail !== "undefined") {
                formData.append("thumbnail", thumbnail);
            }
            formData.append("title", data.title);
            formData.append("detail", data.detail);
            const response = await projectApi.update(formData, project._id);
            if (response.code === "200") {
                // addProject(response);
                createNotification("success", response.message);
                handleClickClose();
            } else {
                createNotification("error", response.message);
            }
        } catch (error) {
            console.log("Failed to fetch product list: ", error.message);
        }
    };
    return (
        <>
            <i className="fas fa-edit" onClick={handleClickShow}></i>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Update project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="label">Title</label>
                            <input
                                name="title"
                                className="input"
                                value={project.title}
                                type="text"
                                {...register("title")}
                            ></input>
                            <div className="alter">
                                <div
                                    className={
                                        errors["title"]
                                            ? "alert alert-danger"
                                            : ""
                                    }
                                    role="alert"
                                >
                                    <p>{errors["title"]?.message}</p>
                                </div>
                            </div>
                            <label className="label">Detail</label>
                            <input
                                name="detail"
                                className="input"
                                value={project.detail}
                                type="text"
                                {...register("detail")}
                            ></input>
                            <div className="alter">
                                <div
                                    className={
                                        errors["detail"]
                                            ? "alert alert-danger"
                                            : ""
                                    }
                                    role="alert"
                                >
                                    <p>{errors["detail"]?.message}</p>
                                </div>
                            </div>
                            <label className="label">Image</label>
                            <div className="project-img">
                                <img
                                    className="img"
                                    src={imgUrl}
                                    alt={project.title}
                                />
                            </div>
                            <input
                                name="thumbnail"
                                className="input"
                                type="file"
                                {...register("thumbnail")}
                            ></input>
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Sửa project
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClickClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateProject;
