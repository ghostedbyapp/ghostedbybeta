import React, { Component } from 'react'
import FB from '../config/FB'
import API from '../utils'
import AdminTable from '../components/AdminTable'

export class CompanyLogs extends Component {
  state= {
    database: {},
    rows: []
  }

  makeTable = data => {
    let rows = []
    for (const i in data) {
      rows.push(
        <tr>
            <td>{data[i].name}</td>
            <td>{data[i].address}</td>
            <td>{data[i].city}</td>
            <td>{data[i].state}</td>
            <td>{data[i].zipcode}</td>
            <td>{data[i].countIds.length}</td>
        </tr>
      )
    }
    this.setState({
      rows: rows
    })
  }

  getAllCompanies = () => {
    API.getDatabase()
      .then(data => {
        console.log(data)
        this.setState({
          database: data
        })
        this.makeTable(data.data);
      })
  }

  componentDidMount() {
    this.authListener()
    this.getAllCompanies();
  }

  authListener() {
    FB.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  render() {

    return (
      <div>
        <h1>Welcome to GhostedBy!</h1>

        <p>As a subscriber you have access to the full set of data in our database for your reputation management.  
          Please contact ghostedbymedia@gmail.com if you have any questions.</p>

          <p>Thanks,</p>

          <p>The GhostedBy Team</p>
          <AdminTable 
            rows= {this.state.rows}
          />
      </div>
    )
  }
}

export default CompanyLogs
