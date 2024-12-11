// import { Component } from "react";
import React from "react";
import Form from "./common/form";
import "./common/inputField";
import InputField from "./common/inputField";
const Joi = require("joi-browser");
export default class RegisterForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "", name: "" },
      error: {},
    };
  }
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string()
      .min(5)
      .max(30)
      .regex(/^[a-zA-Z0-9]*$/)
      .required()
      .label("Password"),

    name: Joi.string().required().label("Name"),
  };
  // responsible to validate the input fields after submission
  handleSubmit = (e) => {
    e.preventDefault();

    let error = this.validate();
    this.setState({ error: error || {} }); // set the state with any error or no value
    if (error) return;
    // call  server
    this.doSubmit();
  };
  doSubmit = () => {
    console.log("Server Submitted");
  };
  render() {
    const { data, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <h1>Registration Form</h1>
          <InputField
            name={"username"}
            type={"email"}
            error={error.username}
            value={data.username}
            label={"Username"}
            onChange={this.handleChange}
          />
          <InputField
            name={"password"}
            type={"password"}
            error={error.password}
            value={data.password}
            label={"Password"}
            onChange={this.handleChange}
          />
          <InputField
            name={"name"}
            type={"text"}
            value={data.name}
            error={error.name}
            label={"Name"}
            onChange={this.handleChange}
          />
          {this.renderButton("Register")}
        </div>
      </form>
    );
  }
}
