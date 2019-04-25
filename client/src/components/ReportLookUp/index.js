import React, { Component } from "react";
import API from "../../utils"

class ReportLookUp extends Component {

  state = {
    search: '',
    resutls: {}
  };

  componentDidMount() {
    this.loadTop10Companies()
  }

  // Load top 10 companies from the database
  loadTop10Companies = () => {
    API.loadTop10Companies()
      .then((data) => {
        console.log("lifetime", data)
      })
  }

  // Load last 30 days from the database
  last30days = () => {
    API.last30days()
      .then((data) => {
        console.log("last30days", data)
      })
  }

  // Load last 7 days from the database
  last7days = () => {
    API.last7days()
      .then((data) => {
        console.log("last7days", data)
      })
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  }

  initAutoComplete = () => {

    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new window.google.maps.places.Autocomplete(
      window.document.getElementById('lookup-company'), { types: ['establishment'] });

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_components', 'geometry', 'name']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  fillInAddress = () => {

    // Get the place details from the autocomplete object.
    var place = this.autocomplete.getPlace();

    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    }

    var companyResult = {};

    //Check if an invalid company was entered
    if (!place.geometry) {

      // Clear search text input
      this.setState({ search: '' });

      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // Get company name and add to object
    companyResult['company_name'] = place.name;

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        companyResult[addressType] = val;
      }
    }

    companyResult['lat'] = place.geometry.location.lat();
    companyResult['lng'] = place.geometry.location.lng();

    // Clear search text input and add all company info
    this.setState({
      search: '',
      resutls: companyResult
    });

    // Save company to database
    this.saveCompany(this.state.resutls);
  }

  // Save company to database
  saveCompany = companyInfo => {
    API.saveCompany(companyInfo)
      .then((data) => {

        // If company was not save and already in the database
        if (data.data.companyInfo !== "saved") {

          let companyInfo = {
            id: data.data.id,
            name: data.data.name
          }
          this.reportCompany(companyInfo);
        }
        else {
          // Saved
          console.log(data.data.companyInfo)
        }
      })
  }

  // Report company and add new count to database
  reportCompany = companyInfo => {
    API.reportCompany(companyInfo)
      .then(function (data) {
        console.log(data)
      })
  }

  render() {
    return (

      // left side of home page to report or lookup a company
      <div className="col-sm-6 col-lg-6">
        <h1 className="block-titleData frequency text-white">Report Companies Who Ghost Interview Candidates</h1>
        <p className="lead mb-4 text-white">Report violators. Research trending companies. Become more productive in
      your job search.</p>
        <input type="text" id="lookup-company" value={this.state.search} onChange={this.handleInputChange} className="form-control" />
      </div>
    )
  }
}

export default ReportLookUp;
