import React from "react";
import "./MapDescriptionMapWrapper.css"; 

function MapDescriptionMapWrapper(props) {
    return (
        <div className="pb-5 pt-5 map-wrapper">
            <div className="container">
                <div className="row divHeight">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default MapDescriptionMapWrapper;
