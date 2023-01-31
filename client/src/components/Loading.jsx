import React from "react";

const Loading = ({ color }) => (
    <div
        className={`spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ${color} border-dashed`}
        role="status"
    >
        <span className="hidden">Loading...</span>
    </div>
);

export default Loading;
