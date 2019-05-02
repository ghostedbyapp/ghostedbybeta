import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import FB from '../config/FB'

export class CompanyLogs extends Component {

  componentDidMount() {
    this.authListener()
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
      </div>
    )
  }
}

export default CompanyLogs
