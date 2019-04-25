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
import API from "./utils/index"

class App extends Component {
  state = {
    top10: {}
  }

  setArrays = data => {
    let nameArray = []
    let countArray = []
    for (let i in data.data) {
      nameArray.push(data.data[i].name);
      countArray.push(data.data[i].countIds)
    }

    this.setState({
      top10 : {
        names: nameArray,
        counts: countArray
      }
    })
  }

  // Load top 10 companies from the database
  loadLifetimeCompanies = () => {
    API.loadLifetimeCompanies()
      .then((data) => {
        console.log("lifetime", data)
        this.setArrays(data);
      })
  }

  // Load last 30 days from the database
  last30days = () => {
    API.last30days()
      .then((data) => {
        console.log("last30days", data)
        this.setArrays(data);
      })
  }

  // Load last 7 days from the database
  last7days = () => {
    API.last7days()
      .then((data) => {
        console.log("last7days", data)
        this.setArrays(data);
      })
  }

  componentDidMount() {
    this.renderMapsAndPlaces();
    this.loadLifetimeCompanies();
  }

  renderMapsAndPlaces = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBbyk8K108Ko9KQlMx7jtjPmga2wn0IpJs&libraries=places&callback=initialize")
    window.initialize = this.initialize
  }

  // Initialize Google Maps and Places API and reference child components to call functions.
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
            <Chart 
              companies= {this.state.top10.names}
              counts= {this.state.top10.counts}
            />
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
