import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createNotification } from "../../Notification/Notification";
import userApi from "../../../Api/userApi";
import projectApi from "../../../Api/ProjectApi";
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
AddUser.propTypes = {
    addProjectClick: PropTypes.func,
};
function AddUser(props) {
    const { id } = props;
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [users, setUser] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await userApi.getAll();
                setUser(response.body);

                // if (response.code !== "200") {
                //     createNotification("error", response.message);
                // } else {
                //     createNotification("success", response.message);
                // }
            } catch (error) {
                console.log("Failed to fetch product list: ", error);
            }
        };

        fetchUserList();
    }, []);

    const onSubmit = async (data) => {
        try {
            const response = await projectApi.addUserToProject(id, data.user);
            if (response.code === "200") {
                createNotification("success", response.message);
            } else {
                createNotification("error", response.message);
            }
        } catch (error) {
            console.log("Failed to fetch product list: ", error.message);
        }
    };
    return (
        <>
            <Button
                className="btn-add-user"
                variant="light"
                onClick={handleClick}
            >
                <i className="fas fa-plus"></i>Thêm user
            </Button>

            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="label">Danh sách user</label>
                            <select {...register("user")}>
                                {users.map((item, index) => (
                                    <option key={index} value={item._id}>
                                        {item.username}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Add user
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

export default AddUser;
