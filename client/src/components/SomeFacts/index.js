import React from "react";

function SomeFacts() {
    return (
        // some facts

        <div className="block block-secondary app-block-marketing-grid">
        <div className="container text-xs-center">
          <div className="row mb-5 justify-content-center">
            <div className="col-10 col-sm-8 col-lg-6">
              <h6 className="text-muted text-uppercase mb-2">There is a fundamental disconnect</h6>
              <h2 className="mb-4">Research shows job seekers expect communication and companies want process & efficiency.</h2>
            </div>
          </div>
          <div className="row app-marketing-grid">
            <div className="col-md-4 px-4 mb-5">
              <img className="mb-1" src="assets/img/startup-14.svg" alt=""/>
              <p><strong>Poor Experience.</strong> 60% of job seekers say they have a poor interview experience.</p>
            </div>
            <div className="col-md-4 px-4 mb-5">
              <img className="mb-1" src="assets/img/startup-13.svg" alt=""/>
              <p><strong>Relationship Management.</strong> 72% of job seekers share a negative experience online or with
                someone directly.</p>
            </div>
            <div className="col-md-4 px-4 mb-5">
              <img className="mb-1" src="assets/img/startup-11.svg" alt=""/>
              <p><strong>Time.</strong> Job seekers spend 3 to 4 hours on an interview and companies spend about 15 minutes
                on the same interview process.</p>
            </div>
          </div>
        </div>
      </div>

    )
}

export default SomeFacts;