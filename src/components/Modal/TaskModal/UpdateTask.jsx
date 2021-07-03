import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import taskApi from "../../../Api/TaskClient";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from "../../Notification/Notification";
const schema = yup.object().shape({
    title: yup
        .string()
        .required("Title không được trống")
        .min(6, "Title không được nhỏ hơn 6 ký tự"),
    // detail: yup
    //     .string()
    //     .required("Detail không được trống")
    //     .min(6, "Detail không được nhỏ hơn 6 ký tự"),
});
function AddTask(props) {
    const { id, title, updateTask } = props;
    const [value, onChange] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleClickShow = () => setShow(true);
    const handleClickClose = () => setShow(false);
    const [selectDate, setselectDate] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        reset({
            title: title,
        });
    }, []);
    const onSubmit = async (data) => {
        try {
            // console.log(id);
            // console.log(data);
            // console.log(title);

            const response = await taskApi.updateTask(data, id);
            if (response.data.code === "200") {
                reset({});
                createNotification("success", response.data.message);
                if (updateTask) {
                    updateTask(response.data.body);
                }
            } else {
                createNotification("error", response.data.message);
            }
        } catch (err) {
            console.log("Failed to fetch product list: ", err.message);
        }
    };
    return (
        <>
            <i
                className="fas fa-pen-square update-task"
                onClick={handleClickShow}
            ></i>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa task</Modal.Title>
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
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Sửa task
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
