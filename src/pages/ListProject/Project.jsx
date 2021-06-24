import React from "react";
import PropTypes from "prop-types";
import "./Project.css";
import Moment from "react-moment";
import projectApi from "../../Api/ProjectApi";
import { createNotification } from "../../components/Notification/Notification";
import DeleteProject from "../../components/Modal/ProjectModal/DeleteProject";
import UpdateProject from "../../components/Modal/ProjectModal/UpdateProject";
import { useHistory } from "react-router-dom";
import AddUser from "../../components/Modal/UserModal/AddUser";
Project.propTypes = {
    project: PropTypes.object.isRequired,
};

function Project(props) {
    const { project, updateStauts, handleUpdatePro, handleDeletePro } = props;
    const history = useHistory();
    const imgUrl =
        "http://localhost:3001/static/" + project.thumbnail.split("/")[2];
    const handleMoveTask = () => {
        history.push(`/task/${project._id}`);
    };
    const updateProject = (id) => {
        if (updateStauts) {
            updateStauts(id);
        }
    };
    const handleDelete = (data) => {
        handleDeletePro(data);
    };
    const handleUpdateProject = (data) => {
        handleUpdatePro(data.projectUpdate);
    };
    return (
        <div className="project">
            <DeleteProject id={project._id} handleDelete={handleDelete} />
            <UpdateProject
                project={project}
                handleUpdatePro={handleUpdateProject}
            />
            <AddUser id={project._id} />
            <i
                className={
                    project.status === "undone"
                        ? "fas fa-circle dot-yellow"
                        : "fas fa-circle dot-green"
                }
                onClick={() => updateProject(project._id)}
            ></i>
            <div className="project-img" onClick={handleMoveTask}>
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
