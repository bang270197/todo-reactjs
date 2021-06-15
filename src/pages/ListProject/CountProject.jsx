import React from "react";
import PropTypes from "prop-types";

CountProject.propTypes = {
    count: PropTypes.number.isRequired,
};

function CountProject(props) {
    const { count } = props;
    return <div className="count-project">Tổng số project:{count}</div>;
}

export default CountProject;
