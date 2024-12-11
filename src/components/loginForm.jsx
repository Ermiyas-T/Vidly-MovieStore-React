import React from "react";
import InputField from "./common/inputField";
import Form from "./common/form";
const Joi = require("joi-browser");
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    error: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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
    const { username, password } = { ...this.state.data };
    const { error } = { ...this.state };
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <h1>Login</h1>
          <InputField
            name="username"
            value={username}
            label="Username"
            type="text"
            error={error.username}
            onChange={this.handleChange}
          />
          <InputField
            name="password"
            value={password}
            label="Password"
            type="text"
            error={error.password}
            onChange={this.handleChange}
          />
          {this.renderButton("Login")}
        </div>
      </form>
    );
  }
}
export default LoginForm;
