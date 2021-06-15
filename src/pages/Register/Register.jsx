import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import { Contents } from "./Index";
import "./Register.css";
import authApi from "../../Api/AuthApi";
import { createNotification } from "../../components/Notification/Notification";
const schema = yup.object().shape({
    username: yup
        .string()
        .required("User không được trống")
        .min(6, "User không được nhỏ hơn 6 ký tự"),
    password: yup
        .string()
        .required("Password không được trống")
        .min(6, "Password không được nhỏ hơn 6 ký tự"),
    email: yup.string().required().email("Sai định dạng email"),
});
function Register(props) {
    const loginApi = async (data) => {
        try {
            const response = await authApi.register(data);
            if (response.code === "200") {
                createNotification("success", response.message);
            } else {
                createNotification("error", response.message);
            }
        } catch (error) {
            console.log("Failed to fetch product list: ", error);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        await loginApi(data);
        console.log(data);

        // await loginApi();
    };
    return (
        <div className="App-login">
            <ToastContainer />
            <h1>Đăng Ký</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {Contents.inputs.map((input, index) => {
                    return (
                        <div key={index}>
                            <label className="label">{input.label}</label>
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
                <button className="btn" type="submit">
                    Đăng Ký
                </button>
            </form>
        </div>
    );
}

export default Register;
