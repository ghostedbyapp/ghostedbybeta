import React, { Component } from "react";
import MainWrapper from "./components/MainWrapper";
import NavBar from "./components/NavBar";
import LookUpChartWrapper from "./components/LookUpChartWrapper";
import ReportLookUp from "./components/ReportLookUp";
import Chart from "./components/Chart";
import MapDescriptionMapWrapper from "./components/MapDescriptionMapWrapper";
import MapDescription from "./components/MapDescription";
import Maps from "./components/Maps";
import Definition from "./components/Definition";
import SomeFacts from "./components/SomeFacts";
import Footer from "./components/Footer";

class App extends Component {

  componentDidMount() {
    this.renderMapsAndPlaces()
  }

  renderMapsAndPlaces = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBbyk8K108Ko9KQlMx7jtjPmga2wn0IpJs&libraries=places&callback=initialize")
    window.initialize = this.initialize
  }

  initialize = () => {
    this.refs.placesApi.initAutoComplete();
    this.refs.mapsApi.initMap();
 }

  render() {
    return (
      <div>
        <MainWrapper>
          <NavBar />
          <LookUpChartWrapper>
            <ReportLookUp ref="placesApi" />
            <Chart />
          </LookUpChartWrapper>
        </MainWrapper>
        <MapDescriptionMapWrapper>
            <MapDescription />
            <Maps ref="mapsApi"/>
          </MapDescriptionMapWrapper>
        <Definition />
        <SomeFacts />
        <Footer />
      </div>
    )
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
