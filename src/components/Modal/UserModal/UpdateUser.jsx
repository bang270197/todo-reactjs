import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import taskApi from "../../../Api/userApi";
import { createNotification } from "../../Notification/Notification";
const schema = yup.object().shape({
    // title: yup
    //     .string()
    //     .required("Title không được trống")
    //     .min(6, "Title không được nhỏ hơn 6 ký tự"),
    // detail: yup
    //     .string()
    //     .required("Detail không được trống")
    //     .min(6, "Detail không được nhỏ hơn 6 ký tự"),
});
function UpdateUser(props) {
    const [show, setShow] = useState(false);
    const handleClickShow = () => setShow(true);
    const handleClickClose = () => setShow(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    // const { id } = useParams();
    const onSubmit = async (data) => {
        try {
            data.username = localStorage.getItem("username");

            const response = await taskApi.updateUser(data);
            if (response.data.code === "200") {
                reset({});
                createNotification("success", response.data.message);
            } else {
                createNotification("error", response.data.message);
            }
        } catch (err) {
            console.log("Failed to fetch product list: ", err.message);
        }
    };
    return (
        <>
            <button className="btn btn-light" onClick={handleClickShow}>
                <i className="fas fa-user-circle"></i>
                User
            </button>
            {/* <ToastContainer /> */}
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="label">PassWord</label>
                            <input
                                name="newpassword"
                                className="input"
                                type="password"
                                {...register("newpassword")}
                            ></input>
                            <label className="label">Email</label>
                            <input
                                name="email"
                                className="input"
                                type="text"
                                {...register("email")}
                            ></input>
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Update user
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

export default UpdateUser;
