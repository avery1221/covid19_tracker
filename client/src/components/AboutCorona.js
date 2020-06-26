import React, { Component } from "react";

export class AboutCorona extends Component {
  render() {
    return (
      <div style={{ marginTop: "90px" }}>
        <iframe
          title="About"
          width="100%"
          height="2500px"
          src="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
        ></iframe>
      </div>
    );
  }
}

export default AboutCorona;
