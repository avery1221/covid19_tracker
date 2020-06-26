import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavItem from "./Nav";
import Countries from "./Countries";
import axios from "axios";
import Total from "./Total";
import About from "./About";
import AboutCorona from "./AboutCorona";
import Prevention from "./Prevention";
import CountryData from "./CountryData";
import MapContainer from "./MapContainer";
import { Tab, Nav, Container, Row, Col } from "react-bootstrap";
import LocalData from "./LocalData";
import Signup from "./sign-up";
import LoginForm from "./login-form";
import Logout from "./logout";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      country: [],
      loading: false,
      loggedIn: false,
      username: null,
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  getCountries = async () => {
    this.setState({ loading: true });

    const res = await axios.get("https://corona.lmao.ninja/v2/countries/");

    this.setState({
      countries: res.data.sort((a, b) => b.cases - a.cases),
      loading: false,
    });
  };

  //get single country data

  getCountryData = async (country) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://corona.lmao.ninja/v2/countries/${country}`
    );

    this.setState({ country: res.data, loading: false });
  };

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/user/").then((response) => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null,
        });
      }
    });
  }

  componentWillMount() {
    localStorage.getItem("countries") &&
      this.setState({
        countries: JSON.parse(localStorage.getItem("countries")),
        loading: false,
      });
  }

  async componentDidMount() {
    this.getCountries();
    this.getCountryData();
    this.getUser();
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("countries", JSON.stringify(nextState.countries));
    localStorage.setItem("country", JSON.stringify(nextState.country));
  }

  render() {
    return (
      <Router>
        <div>
          <NavItem
            updateUser={this.updateUser}
            loggedIn={this.state.loggedIn}
          />

          {/* greet user if logged in: */}
          {this.state.loggedIn && <p>Join the party, {this.state.username}!</p>}
          <Switch>
            {/* Routes to different components */}
            <Route
              exact
              path="/"
              render={() => <LoginForm updateUser={this.updateUser} />}
            />
            <Route
              exact
              path="/logout"
              render={() => <Logout updateUser={this.updateUser} />}
            />

            <Route
              exact
              path="/login"
              render={() => <LoginForm updateUser={this.updateUser} />}
            />
            <Route path="/signup" render={() => <Signup />} />

            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <Fragment>
                  <Container fluid>
                    <Row>
                      <Col sm={3}>
                        <Total />
                      </Col>
                      <Col sm={9} style={{ marginTop: "70px" }}>
                        <Tab.Container defaultActiveKey="first">
                          <Row>
                            <Col sm={3}></Col>
                            <Col sm={6}>
                              <Nav
                                fill
                                variant="pills"
                                defaultActiveKey="first"
                              >
                                <Nav.Item>
                                  <Nav.Link
                                    className="btn-info"
                                    eventKey="first"
                                  >
                                    Covid-19 Map
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                >
                                  <Nav.Link
                                    eventKey="second"
                                    className="btn-info"
                                  >
                                    All Countries
                                  </Nav.Link>
                                </Nav.Item>
                              </Nav>
                            </Col>
                            <Col sm={3}></Col>
                          </Row>

                          <Row>
                            <Col>
                              <Tab.Content
                                style={{
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              >
                                <Tab.Pane eventKey="first">
                                  <MapContainer />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                  <Row>
                                    <Col>
                                      <Countries
                                        loading={this.state.loading}
                                        countries={this.state.countries}
                                      />
                                    </Col>
                                  </Row>
                                </Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </Row>
                        </Tab.Container>
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                    </Row>
                  </Container>
                  <LocalData
                    updateuser={this.updateUser}
                    username={this.state.username}
                  />
                </Fragment>
              )}
            />

            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/country/:country"
              render={(routeProps) => (
                <CountryData
                  {...routeProps}
                  getCountryData={this.getCountryData}
                  country={this.state.country}
                  loading={this.state.loading}
                />
              )}
            />
            <Route exact path="/about-covid-19" component={AboutCorona} />
            <Route exact path="/prevention" component={Prevention} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
