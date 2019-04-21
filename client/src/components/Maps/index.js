import React, { Component } from "react";
import "./maps.css"; 

class Maps extends Component {


  initMap = () => {

    console.log("ok something is working")

    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 1
    })
  }

  render() {
    return (

      // left side of home page to report or lookup a company
      <div className="col-sm-6 col-lg-6">
        <div id="map"></div>
      </div>
    )
  }
}

export default Maps;
