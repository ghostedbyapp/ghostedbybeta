import React from "react";

function Chart(props) {
  return (
    // right side of home page with report on top 10 in bubble chart format
    <div className="col-sm-6 col-lg-6">
      <h1 className="block-titleData frequency text-white">Top 10 trending companies</h1>
      <p className="lead mb-4 text-white">Select by 7 days, 30 days or life to date.</p>
    </div>
  )
}

export default Chart;