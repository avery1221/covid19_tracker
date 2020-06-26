import React, { useState } from "react";
//import api from "../util/api";
import { Container, Row } from "reactstrap";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    // Call API Route to Validate Password

    //return <Redirect to="/dashboard" />;
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <Container className="themed-container" fluid="md">
        <Row>
          <form
            id="formLogin"
            class="login container center"
            onSubmit={this.handleSubmit}
          >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="emailInput"
                name="emailInput"
                placeholder="Email"
                value={this.state.username}
                onChange={this.handleUsername}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                name="passwordInput"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePassword}
              />
            </div>
            <button type="submit" class="btn btn-default">
              Login
            </button>
          </form>
        </Row>
      </Container>
    );
  }
}

export default Login;
