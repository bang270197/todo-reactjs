import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import taskApi from "../../../Api/TaskClient";
import { createNotification } from "../../Notification/Notification";
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
function AddTask(props) {
    const { project, handleUpdatePro } = props;
    const [show, setShow] = useState(false);
    const handleClickShow = () => setShow(true);
    const handleClickClose = () => setShow(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { id } = useParams();
    const onSubmit = async (data) => {
        try {
            const response = await taskApi.create(data, id);
            if (response.code === "200") {
                createNotification("success", response.message);
            } else {
                createNotification("error", response.message);
            }
        } catch (err) {
            console.log("Failed to fetch product list: ", err.message);
        }
    };
    return (
        <>
            <button className="btn btn-primary" onClick={handleClickShow}>
                <i className="fas fa-plus"></i>Thêm task
            </button>
            <ToastContainer />
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="label">Title</label>
                            <input
                                name="title"
                                className="input"
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
                            <label className="label">Priority</label>
                            <select {...register("priority")}>
                                <option value="high">high</option>
                                <option value="medium">medium</option>
                                <option value="low">low</option>
                            </select>
                            <label className="label">Status</label>
                            <select {...register("status")}>
                                <option value="new">new</option>
                                <option value="progress">progress</option>
                                <option value="done">done</option>
                            </select>
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Add task
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

export default AddTask;