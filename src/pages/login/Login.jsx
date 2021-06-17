import React from "react";
import { LoginItem } from "../../Constants/Item";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Login.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "../../Api/AuthApi";

import { createNotification } from "../../components/Notification/Notification";

const schema = yup.object().shape({
    username: yup.string().required().min(6),
    password: yup.string().required().min(6),
});

function Login(props) {
    const history = useHistory();
    // const history = useHistory();
    // const [body, setBody] = useState();
    const loginApi = async (data) => {
        try {
            const response = await authApi.login(data);
            if (response.code === "200") {
                localStorage.setItem("access_token", response.accessToken);
                createNotification("success", response.message);
                history.push("/project");
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
            <h1>Đăng nhập</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {LoginItem.inputs.map((input, index) => {
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
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default Login;
