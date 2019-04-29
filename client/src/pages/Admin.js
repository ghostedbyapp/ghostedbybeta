import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import FB from '../config/FB'
import Auth from "../config/Auth"
import "./admin.css";

var styles = {
  background: '#28669F',
  padding: '12px',
  borderRadius: '4px',
  color: '#fff'
};

class Admin extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // Login to Firebase
    FB.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((e) => {

        Auth.login(() => {
          this.props.history.push("/companyLogs");
        })
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-3 text-center vertical-center">
            <div className="pb-5">
              <strong style={styles}>GhostedBy</strong>
            </div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="email" className="form-control" id="email" onChange={this.handleChange} placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="password" onChange={this.handleChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    )
  }
}

export default withRouter(Admin);
