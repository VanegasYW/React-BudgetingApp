import React from "react";

const Loading = ({ color }) => (
    <div className="flex justify-center items-center">
        <div
            className={`spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-${color}-500 border-dashed`}
            role="status"
        >
            <span className="hidden">Loading...</span>
        </div>
    </div>
);

export default Loading;
