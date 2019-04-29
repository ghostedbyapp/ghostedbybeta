import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import FB from '../config/FB'

export class companyLogs extends Component {

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
    // if (!this.state.loggedIn) return <Redirect to='/' />
    return (
      <div>
        This shit works!
      </div>
    )
  }
}

export default companyLogs
