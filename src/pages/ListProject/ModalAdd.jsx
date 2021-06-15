import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Contents } from "./MenuIitem";
import { createNotification } from "../../components/Notification/Notification";
import projectApi from "../../Api/ProjectApi";
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
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    function addProject(project) {
        if (addProjectClick) {
            addProjectClick(project);
        }
    }

    const createApi = async (data) => {
        try {
            let thumbnail = data.thumbnail[0];
            const formData = new FormData();
            formData.append("thumbnail", thumbnail);
            formData.append("title", data.title);
            formData.append("detail", data.detail);
            const response = await projectApi.create(formData);
            if (response.code === "200") {
                addProject(response);
                createNotification("success", response.message);
            } else {
                createNotification("error", response.message);
            }
        } catch (error) {
            console.log("Failed to fetch product list: ", error.message);
        }
    };
    const onSubmit = async (data) => {
        await createApi(data);
        // await loginApi();
    };
    return (
        <>
            <Button variant="primary" onClick={handleClick}>
                Thêm mới project
            </Button>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Thêm mới project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {Contents.inputs.map((input, index) => {
                            return (
                                <div key={index}>
                                    <label className="label">
                                        {input.label}
                                    </label>
                                    <input
                                        name={input.name}
                                        className="input"
                                        type={input.type}
                                        {...register(`${input.name}`)}
                                    ></input>
                                    <div className="alter">
                                        <div
                                            className={
                                                errors[input.name]
                                                    ? "alert alert-danger"
                                                    : ""
                                            }
                                            role="alert"
                                        >
                                            <p>{errors[input.name]?.message}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <button className="btn btn-primary" type="submit">
                            Thêm project
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
