import React from "react";

export default function InputField({ name, label, error, ...rest }) {
  // let { name, type, onChange, label, value, error } = { ...props };
  // const [type, onChange, value,...rest] = { props };
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error ? <div className="alert alert-danger">{error}</div> : null}
    </>
  );
}
