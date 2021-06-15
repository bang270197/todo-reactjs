import React from "react";
import PropTypes from "prop-types";
import "./Project.css";
import Moment from "react-moment";
Project.propTypes = {
    project: PropTypes.object.isRequired,
};

function Project(props) {
    const { project } = props;
    const imgUrl =
        "http://localhost:3001/static/" + project.thumbnail.split("/")[2];

    return (
        <div className="project">
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
