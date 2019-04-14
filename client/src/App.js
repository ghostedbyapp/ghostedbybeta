import React, { Component } from "react";
import MainWrapper from "./components/MainWrapper";
import NavBar from "./components/NavBar";
import LookUpChartWrapper from "./components/LookUpChartWrapper";
import ReportLookUp from "./components/ReportLookUp";
import Chart from "./components/Chart";
import Definition from "./components/Definition";
import SomeFacts from "./components/SomeFacts";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <MainWrapper>
        <NavBar />
        <LookUpChartWrapper>
          <ReportLookUp />
          <Chart />
        </LookUpChartWrapper>
        <Definition/>
        <SomeFacts/>
        <Footer/>
      </MainWrapper>
    )
  }
}

export default App;
