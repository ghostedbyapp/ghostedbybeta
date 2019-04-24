import React, { Component } from "react";
import API from "../../utils"
import "./maps.css";

class Maps extends Component {

  state = {
    companies: []
  };

  // Load all companies from the database
  loadAllCompanies = () => {
    API.loadAllCompanies()
      .then((data) => {

        this.setState({ companies: data.data })

        // Render the map
        this.renderMarkers()
      })
  }

  initMap = () => {

    // Load all companies before rendering the map
    this.loadAllCompanies()
  }

  renderMarkers = () => {

    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 1
    })

    // Add infowindow information
    var infoWindow = new window.google.maps.InfoWindow();

    this.state.companies.map(company => {

      var contentString = `${company.name}`

      var marker = new window.google.maps.Marker({
        position: { lat: company.lat, lng: company.lng },
        map: map
      })
 
      marker.addListener('click', function(){
        infoWindow.setContent(contentString)
        infoWindow.open(map,marker)
      })
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
