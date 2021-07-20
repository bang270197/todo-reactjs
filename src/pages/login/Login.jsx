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
import { Link } from "react-router-dom";
import { createNotification } from "../../components/Notification/Notification";
import { Col, Container, Row, Spinner } from "react-bootstrap";
const schema = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(6, "username không được nhỏ hơn 6 ký tự"),
    password: yup
        .string()
        .required()
        .min(6, "password không được nhỏ hơn 6 ký tự"),
});

function Login(props) {
    const history = useHistory();
    // const history = useHistory();
    // const [body, setBody] = useState();
    const loginApi = async (data) => {
        try {
            const response = await authApi.login(data);
            if (response.data.code === "200") {
                localStorage.setItem("access_token", response.data.accessToken);
                localStorage.setItem("username", response.data.username);
                createNotification("success", response.data.message);
                history.push(`/project`);
            } else {
                createNotification("error", response.data.message);
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
        // await loginApi();
    };
    return (
        <div className="App-login">
            <ToastContainer />
            <h1>Đăng nhập</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {LoginItem.inputs.map((input, index) => {
                    return (
                        <div key={index} className="container">
                            <label className="label-login">{input.label}</label>
                            <input
                                name={input.name}
                                className="input-login"
                                type={input.type}
                                {...register(`${input.name}`)}
                            ></input>
                            <div className="alter">
                                <div
                                    className={
                                        errors[input.name] ? "danger" : ""
                                    }
                                    role="alert"
                                >
                                    <p>{errors[input.name]?.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="btn-login">
                    <button className="btn" type="submit">
                        Đăng nhập
                    </button>
                    <Link className="link-dk" to={"/sign-up"}>
                        Đăng ký
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
