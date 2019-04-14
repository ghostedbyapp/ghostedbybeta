import React from "react";

function MainWrapper(props) {
  return (
    <div className="block bg-primary text-white block-fill-height app-header">
      {props.children}
    </div>
  )
}

export default MainWrapper;
 