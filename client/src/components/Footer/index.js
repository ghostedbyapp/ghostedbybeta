import React from "react";
import {Link} from "react-router-dom"

var styles = {
  color: '#000000'
};

function Footer() {
    return (
      // footer area

      <div className="block block-inverse app-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-5 mb-5">
              <ul className="list-unstyled list-spaced">
                <li className="mb-2">
                  <h6 className="text-uppercase">About</h6>
                </li>
                <li className="text-muted">
                  Helping job seekers research companies and companies manage their reputation. <a
                    href="mailto: ghostedbymedia@gmail.com">ghostedbymedia@gmail.com</a>.
                </li>
              </ul>
            </div>
            <div className="col-md-4 ml-auto mb-5">
              <ul className="list-unstyled list-spaced">
                <li className="mb-2">
                  <h6 className="text-uppercase">Terms & Conditions</h6>
                </li>
                <Link to="/privacy">Privacy</Link>
              </ul>
            </div>
            <div className="col-md-12 ml-auto mb-12">
              <p>Please submit companies you've been GhostedBy to this database with integrity and honesty as this is
                intended to be a source for candidates to share and research company activities for a more productive job
                search. GhostedBy is a crowdsource database collecting the wisdom of the crowd to report companies who ghost
                candidates. Please report responsibly.</p><Link to="/admin" style={styles}>Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Footer;