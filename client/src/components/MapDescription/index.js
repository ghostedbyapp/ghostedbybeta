import React from "react";
import "./mapDescription.css";

function MapDescription() {
  return (
    // right side of home page with report on top 10 in bubble chart format
    <div className="col-sm-6 col-lg-6">
      <h1 className="block-titleData frequency text-black">Global view of all Companies</h1>
      <h5 className="lead mb-4 text-black">View all companies base on their location and view current Ghosted count.</h5>
    </div>
  )
}

export default MapDescription;
