import React from "react";
import "./navbar.css"; 

var styles = {
    background: '#fff',
    padding: '12px',
    borderRadius: '4px',
    color: '#28669F'
  };

function NavBar() {
    return (
        <div className="container py-4 fixed-top app-navbar">
            <nav className="navbar navbar-transparent navbar-padded navbar-expand-md">
                <a className="navbar-brand mr-auto" href="/">
                    <strong style={styles}>GhostedBy</strong>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-distance="-250">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="d-none d-md-block text-uppercase">
                    <ul className="navbar-nav"></ul>
                </div>
            </nav>
        </div>

    )
}

export default NavBar;