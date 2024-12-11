// import InputField from "./inputField";
// import Select from "./select";
// import React, { Component } from "react";
// const Joi = require("joi-browser");

// export default class Form extends Component {
//   //Full Form validation
//   constructor(props) {
//     super(props);
//     this.state = { data: {}, error: {} };
//   }

//   validate = () => {
//     // validate using Joi by comparing schema and actual obj
//     let option = { abortEarly: false };
//     let obj = { ...this.state.data };
//     const { error } = Joi.validate(obj, this.schema, option);
//     if (!error) return null;

//     const errorObj = {};
//     error.details.forEach((item) => {
//       errorObj[item.path[0]] = item.message; // assigns each error message to the errors object created
//     });
//     return errorObj;
//   };
//   validateProperty = (name, value) => {
//     // schema will have one property
//     let obj = { [name]: value }; // dynamically create an object to validate
//     let schema = { [name]: this.schema[name] };
//     let { error } = Joi.validate(obj, schema);

//     return error ? error.details[0].message : null;
//   };
//   // handles input changes and validate each fields independently
//   handleChange = ({ currentTarget: input }) => {
//     const data = { ...this.state.data };
//     data[input.name] = input.value;

//     const error = { ...this.state.error };

//     let errorMessage = this.validateProperty(input.name, input.value);
//     if (errorMessage) error[input.name] = errorMessage;
//     else delete error[input.name];
//     this.setState({ data, error });
//   };
//   renderButton = (label) => {
//     return (
//       <button
//         disabled={Object.keys(this.state.error).length}
//         className="btn btn-primary"
//       >
//         {label}
//       </button>
//     );
//   };
//   renderInputField = (name, label, type = "text") => {
//     const { data, error } = this.state;
//     return (
//       <InputField
//         name={name}
//         type={type}
//         label={label}
//         error={error[name]}
//         value={data[name]}
//         onChange={this.handleChange}
//       />
//     );
//   };
//   renderSelect = (name, label, options) => {
//     const { data, error } = this.state;
//     return (
//       <Select
//         name={name}
//         value={data[name]}
//         label={label}
//         options={options}
//         error={error[name]}
//         onChange={this.handleChange}
//       />
//     );
//   };
// }

//////////////////////////////////////////////////////////////////////////////////////////////

// Form Component
// import InputField from "./inputField";
// import Select from "./select";
// import React, { Component } from "react";
// const Joi = require("joi-browser");

// export default class Form extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { data: {}, error: {} };
//   }

//   validate = () => {
//     let option = { abortEarly: false };
//     let obj = { ...this.state.data };
//     const { error } = Joi.validate(obj, this.schema, option);
//     if (!error) return null;

//     const errorObj = {};
//     error.details.forEach((item) => {
//       errorObj[item.path[0]] = item.message;
//     });
//     return errorObj;
//   };

//   validateProperty = (name, value) => {
//     let obj = { [name]: value };
//     let schema = { [name]: this.schema[name] };
//     let { error } = Joi.validate(obj, schema);
//     return error ? error.details[0].message : null;
//   };

//   handleChange = ({ currentTarget: input }) => {
//     const data = { ...this.state.data };
//     data[input.name] = input.value;

//     const error = { ...this.state.error };

//     let errorMessage = this.validateProperty(input.name, input.value);
//     if (errorMessage) error[input.name] = errorMessage;
//     else delete error[input.name];
//     this.setState({ data, error });
//   };

//   renderButton = (label) => {
//     return (
//       <button
//         disabled={Object.keys(this.state.error).length}
//         className="btn btn-primary"
//       >
//         {label}
//       </button>
//     );
//   };

//   renderInputField = (name, label, type = "text", error) => {
//     const { data } = this.state;
//     return (
//       <InputField
//         name={name}
//         type={type}
//         label={label}
//         error={error}
//         value={data[name]}
//         onChange={this.handleChange}
//       />
//     );
//   };

//   renderSelect = (name, label, options, error) => {
//     const { data } = this.state;
//     return (
//       <Select
//         name={name}
//         value={data[name]}
//         label={label}
//         options={options}
//         error={error}
//         onChange={this.handleChange}
//       />
//     );
//   };
// }

////////////////////////////////////////////////////////////////////////////////////////////

import React, { Component } from "react";
import Joi from "joi-browser";
import InputField from "./inputField";
import Select from "./select";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, error: {} };
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errorObj = {};
    for (let item of error.details) errorObj[item.path[0]] = item.message;
    return errorObj;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    const error = { ...this.state.error };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    this.setState({ data, error });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;

    this.doSubmit();
  };

  renderButton = (label) => (
    <button
      disabled={Object.keys(this.state.error).length > 0}
      className="btn btn-primary"
    >
      {label}
    </button>
  );

  renderInputField = (name, label, type = "text") => {
    const { data, error } = this.state;
    return (
      <InputField
        name={name}
        type={type}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={error[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, error } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        error={error[name]}
      />
    );
  };
}
