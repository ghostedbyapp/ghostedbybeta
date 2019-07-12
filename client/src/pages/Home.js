import React, { Component } from "react";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import LookUpChartWrapper from "../components/LookUpChartWrapper";
import ReportLookUp from "../components/ReportLookUp";
//import Chart from "../components/Chart";
import MapDescriptionMapWrapper from "../components/MapDescriptionMapWrapper";
import MapDescription from "../components/MapDescription";
import Maps from "../components/Maps";
import Definition from "../components/Definition";
import SomeFacts from "../components/SomeFacts";
import Footer from "../components/Footer";
import API from "../utils/"
import Top10 from "../components/Table"



class App extends Component {
  state = {
    top10: {},
    rows : [],
    table: ""
  }

  testFunc = () => {
    console.log(process.env.API_KEY)
  }
  
  // Used for to pass company information to the bar chart in the form of arrays
  // setArrays = data => {
  //   let nameArray = []
  //   let countArray = []
  //   for (let i in data.data) {
  //     nameArray.push(data.data[i].name);
  //     countArray.push(data.data[i].countIds)
  //   }

  //   this.setState({
  //     top10 : {
  //       names: nameArray,
  //       counts: countArray
  //     }
  //   })
  // }

  // Load top 10 companies from the database
  loadTop10Companies = () => {
    API.loadTop10Companies()
      .then((data) => {
        //console.log("lifetime", data)
        this.getRows(data);
      })
    this.setState({
      title: "Top 10 Reported Companies"
    })
  }

  // Load last 30 days from the database
  last30days = () => {
    API.last30days()
      .then((data) => {
        //console.log("last30days", data)
        this.getRows(data);
      })
    this.setState({
      title: "Top 10 Reported Companies in the Past 30 Days"
    })
  }

  // Load last 7 days from the database
  last7days = () => {
    API.last7days()
      .then((data) => {
        //console.log("last7days", data)
        this.getRows(data);
    this.setState({
      title: "Top 10 Reported Companies in the Past 7 Days"
    })
      })
  }

  // The page will load the lifetime top 10 by default
  componentDidMount() {
    this.renderMapsAndPlaces();
    this.loadTop10Companies()
    this.testFunc();
    // this.last30days()
    // this.last7days()
  }

  renderMapsAndPlaces = () => {
    let API_KEY = process.env.API_KEY || process.env.REACT_APP_API_KEY

    loadScript("https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&libraries=places&callback=initialize")
    window.initialize = this.initialize
  }

  // Initialize Google Maps and Places API and reference child components to call functions.
  initialize = () => {
    this.refs.placesApi.initAutoComplete();
    this.refs.mapsApi.initMap();
 }
 
  // Creates an array of row elements containing the top 10 companies
  getRows = (data) => {
    // console.log(data.data[0].name)
    let rows = []
    for (let i in data.data) {
        rows.push(
          <tr key={data.data[i]._id}>
              <td>{data.data[i].name}</td>
              <td>{data.data[i].city} {data.data[i].state}, {data.data[i].address.substring(0,11)}...</td>
              <td>{data.data[i].countIds}</td>
          </tr>
        )
        this.setState({
          rows: rows
        })
    }
  }

  // switchTableHeader = ()
  render() {
    return (
      <div>
        <MainWrapper>
          <NavBar />
          <LookUpChartWrapper>
            <ReportLookUp ref="placesApi" />
            {/* <Chart 
              companies= {this.state.top10.names}
              counts= {this.state.top10.counts}
            /> */}
            <Top10 
              title= {this.state.title}
              rows= {this.state.rows}
              lifetime= {this.loadTop10Companies}
              thirtyDays= {this.last30days}
              sevenDays= {this.last7days}
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
