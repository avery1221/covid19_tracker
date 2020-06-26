import React, { Component } from "react";
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import { Spinner, Container, Card, Row, Col, Button } from "reactstrap";
import "../App.css";
//import TopNews from "./TopNews";
import TopNewsProvider from "./TopNewsProvider";

class LocalData extends Component {
  state = {
    countries: [],
    articles: [],
    cases: null,
    deaths: null,
    active: null,
    critical: null,
    todayCases: null,
    todayDeaths: null,
    country: null,
    recovered: null,
    default_country: null,
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    console.log("DidUpdate");
    console.log(prevProps.username, this.props.username);
    if (prevProps.username !== this.props.username && this.props.username) {
      // Add code to "Get" and set the default_County
      console.log("Get Country");
      console.log(this.props.username);
      axios
        .get(`/user/country/${this.props.username}`)
        .then((res) => {
          console.log(res);
          console.log("Country: " + res.data.defaultCountry);
          this.setState({
            default_country: res.data.defaultCountry,
          });
          this.setCountryData(res.data.defaultCountry);
        })
        .catch((error) => {
          console.log("Get country error: ");
          console.log(error);
        });
    }
  }
  componentDidMount() {
    console.log("DidMount: Username = ", this.props.username);
    if (this.props.username) {
      // Add code to "Get" and set the default_County
      console.log("Get Country");
      console.log(this.props.username);
      axios
        .get(`/user/country/${this.props.username}`)
        .then((res) => {
          console.log(res);
          console.log("Country: " + res.data.defaultCountry);
          this.setState({
            default_country: res.data.defaultCountry,
          });
          this.setCountryData(res.data.defaultCountry);
        })
        .catch((error) => {
          console.log("Get country error: ");
          console.log(error);
        });
    } else {
      axios.get("https://ipapi.co/country").then((res) => {
        console.log(res);
        this.setState({
          default_country: res.data,
        });
        console.log(res.data);
        this.setCountryData(res.data);
      });
    }
    // Add code to "Get" and set the default_County
    console.log("DidMount....");
    axios.get("https://corona.lmao.ninja/v2/countries").then((res) => {
      this.setState({
        countries: res.data.countries,
        loading: true,
      });
    });

    axios
      .get(
        `https://newsapi.org/v2/everything?q=covid19&language=en&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWSAPIKEY}`
      )
      .then((res) => {
        this.setState({
          articles: res.data.articles,
          loading: true,
        });
      });
  }
  setCountryData = (country) => {
    console.log("SetCountryData...");
    axios
      .get(`https://corona.lmao.ninja/v2/countries/${country}`)
      .then((res) => {
        this.setState({
          cases: res.data.cases,
          deaths: res.data.deaths,
          recovered: res.data.recovered,
          active: res.data.active,
          critical: res.data.critical,
          todayCases: res.data.todayCases,
          todayDeaths: res.data.todayDeaths,
          country: res.data.country,
        });
      });
  };
  saveCountry = (country) => {
    console.log(country);
    axios
      .post("/user/country", {
        username: this.props.username,
        defaultCountry: country,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("save country error: ");
        console.log(error);
      });
  };

  setSelectedCountry = (country) => {
    this.saveCountry(country);
    axios
      .get(`https://corona.lmao.ninja/v2/countries/${country}`)
      .then((res) => {
        this.setState({
          cases: res.data.cases,
          deaths: res.data.deaths,
          recovered: res.data.recovered,
          active: res.data.active,
          critical: res.data.critical,
          todayCases: res.data.todayCases,
          todayDeaths: res.data.todayDeaths,
          country: res.data.country,
        });
      });
  };

  render() {
    let html = <Spinner />;
    if (this.state.loading && this.state.default_country !== null) {
      html = (
        <ReactFlagsSelect
          countries={this.state.countries}
          searchable={true}
          defaultCountry={this.state.default_country}
          onSelect={(code) => this.setSelectedCountry(code)}
          selectedSize={20}
          alignOptions="left"
        />
      );
    }

    const mortalityRate = (
      (this.state.deaths / this.state.cases) *
      100
    ).toFixed(2);
    /* const recoveredRate = (
      (this.state.recovered / this.state.cases) *
      100
    ).toFixed(2);
    const activeRate = ((this.state.active / this.state.cases) * 100).toFixed(
      2
    ); */
    return (
      <div style={{ marginTop: "20px" }}>
        <div>
          <Container fluid>
            <Row style={{ marginBottom: "35px", marginLeft: "5px" }}>
              <Col sm={4}>
                <Button
                  disabled
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <h4>Top News</h4>
                </Button>

                <Card
                  className="shadow-sm"
                  style={{
                    height: "435px",
                    overflowY: "auto",
                  }}
                >
                  <TopNewsProvider
                    loading={this.state.loading}
                    articles={this.state.articles}
                  />
                </Card>
              </Col>
              <Col sm={8} style={{ textAlign: "center", marginTop: "40px" }}>
                <div>
                  <Button disabled style={{ backgroundColor: "#2D9707" }}>
                    <h3>Local Country's Update</h3>
                  </Button>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "60px",
                    marginLeft: "500px",
                  }}
                >
                  {html}
                </div>
                <h3 style={{ marginLeft: "-300px", marginTop: "-50px" }}>
                  {this.state.country}'s COVID-19 Statistics
                </h3>
                <Row
                  style={{
                    textAlign: "center",
                    marginTop: "45px",
                    marginRight: "10px",
                  }}
                >
                  <Col>
                    <Card
                      outline
                      style={{
                        borderColor: "#3185F0",
                        borderWidth: "2px",
                        height: "100px",
                      }}
                      className="shadow-sm"
                    >
                      <h1 style={{ color: "#3185F0" }}>{this.state.cases}</h1>
                      <h4>Total Infected</h4>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      outline
                      style={{
                        borderColor: "#F03131",
                        borderWidth: "2px",
                        height: "100px",
                      }}
                      className="shadow-sm"
                    >
                      <h1 style={{ color: "#F03131" }}>{this.state.deaths}</h1>
                      <h4>Total Deaths</h4>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      outline
                      style={{
                        borderColor: "#099714",
                        borderWidth: "2px",
                        height: "100px",
                      }}
                      className="shadow-sm"
                    >
                      <h1 style={{ color: "#099714" }}>
                        {this.state.recovered}
                      </h1>
                      <h4>Total Recovered</h4>
                    </Card>
                  </Col>
                </Row>
                <Row
                  style={{
                    marginTop: "20px",

                    marginRight: "10px",
                  }}
                >
                  <Col>
                    <Card
                      body
                      inverse
                      style={{
                        backgroundColor: "#333",
                        borderColor: "#3185F0",
                        borderWidth: "2px",
                        height: "100px",
                      }}
                      className="shadow-sm"
                    >
                      <h1 style={{ color: "#3185F0", marginTop: "-15px" }}>
                        {this.state.todayCases}
                      </h1>
                      <h4>Infected Today </h4>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      inverse
                      style={{
                        backgroundColor: "#333",
                        borderColor: "#3185F0",
                        borderWidth: "2px",
                        height: "100px",
                      }}
                      className="shadow-sm"
                    >
                      <h1 style={{ color: "#F03131" }}>
                        {this.state.todayDeaths}
                      </h1>
                      <h4>Deaths Today </h4>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      outline
                      style={{
                        borderColor: "#F03131",
                        borderWidth: "2px",
                        height: "100px",
                      }}
                      className="shadow-sm"
                    >
                      <h1 style={{ color: "#F03131" }}>{mortalityRate}%</h1>
                      <h4>Mortality Rate </h4>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            {/* <Row style={{ height: "40px", textAlign: "center" }}>
              <Col sm={3}></Col>
              <Col sm={6}>
                <a></a>
              </Col>
              <Col sm={3}>
                <div></div>
              </Col>
            </Row> */}
          </Container>
        </div>
      </div>
    );
  }
}

export default LocalData;
