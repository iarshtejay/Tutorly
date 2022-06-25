import React from "react";

const CourseDetailsHeading = ({ title }) => {
    return <h1 class="mb-6">{title || "Web Development"}</h1>;
};

export default CourseDetailsHeading;
