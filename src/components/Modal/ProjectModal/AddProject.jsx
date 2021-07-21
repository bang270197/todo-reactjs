import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Contents } from "../../../Constants/Item";
import FileBase from "react-file-base64";
import { createNotification } from "../../Notification/Notification";
import projectApi from "../../../Api/ProjectApi";
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
ModalAdd.propTypes = {
    addProjectClick: PropTypes.func,
};
function ModalAdd(props) {
    const { addProjectClick } = props;
    const [img, setImg] = useState("");
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    function addProject(project) {
        if (addProjectClick) {
            addProjectClick(project);
        }
    }
    const onSubmit = async (data) => {
        try {
            data.thumbnail = img;
            console.log(data);
            // let thumbnail = data.thumbnail[0];
            // const formData = new FormData();
            // formData.append("thumbnail", thumbnail);
            // formData.append("title", data.title);
            // formData.append("detail", data.detail);
            const response = await projectApi.create(data);
            if (response.data.code === "200") {
                addProject(response);
                reset({});
                createNotification("success", response.data.message);
            } else {
                createNotification("error", response.data.message);
            }
        } catch (error) {
            console.log("Failed to fetch product list: ", error.message);
        }
    };
    return (
        <>
            <Button variant="primary" onClick={handleClick}>
                <i className="fas fa-plus"></i>Thêm mới project
            </Button>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới project</Modal.Title>
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
                            <label className="label">Image</label>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setImg(base64)}
                            />
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Add project
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClick}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAdd;
