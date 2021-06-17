import React from "react";
import PropTypes from "prop-types";
import "./Project.css";
import Moment from "react-moment";
import projectApi from "../../Api/ProjectApi";
import { createNotification } from "../../components/Notification/Notification";
import DeleteProject from "../../components/Modal/ProjectModal/DeleteProject";
import UpdateProject from "../../components/Modal/ProjectModal/UpdateProject";
import { useHistory } from "react-router-dom";
Project.propTypes = {
    project: PropTypes.object.isRequired,
};

function Project(props) {
    const { project } = props;
    const history = useHistory();
    const imgUrl =
        "http://localhost:3001/static/" + project.thumbnail.split("/")[2];
    const handleMoveTask = () => {
        history.push(`/task/${project._id}`);
    };

    return (
        <div className="project" onClick={handleMoveTask}>
            <DeleteProject id={project._id} />
            <UpdateProject project={project} />
            <i
                className={
                    project.status === "undone"
                        ? "fas fa-circle dot-red"
                        : "fas fa-circle dot-green"
                }
            ></i>
            <div className="project-img">
                <img className="img" src={imgUrl} alt={project.title} />
            </div>
            <p className="project_name">{project.title}</p>
            <p className="project_name">Người tạo:{project.createBy}</p>
            <p className="project_name">
                ngày tạo:
                <Moment format="DD/MM/YYYY">{project.createdAt}</Moment>
            </p>
        </div>
    );
}

export default Project;
