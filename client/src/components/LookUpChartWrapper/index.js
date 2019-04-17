import React from "react";

function LookUpChartWrapper(props) {
    return (
        <div className="block-xs-middle pb-5">
            <div className="container">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default LookUpChartWrapper;