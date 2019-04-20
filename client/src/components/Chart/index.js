import React from "react";
import Plot from 'react-plotly.js';

function Chart(props) {
  return (
    // right side of home page with report on top 10 in bubble chart format
    <div className="col-sm-6 col-lg-6">
      <h1 className="block-titleData frequency text-white">Top 10 trending companies</h1>
      <p className="lead mb-4 text-white">Select by 7 days, 30 days or life to date.</p>
      <Plot 
        data={[
          {
            x: ["a",'b','c','d','e','f','g','h','i','j'],
            y: [1,2,3,4,5,6,7,8,9,10],
            text: [1,2,3,4,5,6,7,8,9,10],
            type: 'bar'
          }
        ]}
        layout={{
          width: 500,
          height: 400,
          title: "Dummy",
          xaxis: {
            fixedrange: true,
            tickangle: -45
          },
          yaxis: {
            fixedrange: true
          }
        }}
        config = {{
          displayModeBar: false,
          scrollZoom: false
        }}
        // {...props.top10 ?
        //     data:{
        //       x: props.top10.companies,
        //       y: props.top10.ghostedCount,
        //       type: 'bar'
        //     },
        //     layout:{
        //       title:"Top Ten Companies"
        //     }
        //    :
          
          
        //     data={
        //       x: ["a",'b','c','d','e','f','g','h','i','j'],
        //       y: [1,2,3,4,5,6,7,8,9,10],
        //       type:'bar'
        //     },
        //     layout={
        //       title:"Dummy Data"
            
        //   }
        // }
      />
    </div>
  )
}

export default Chart;