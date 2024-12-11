import React, { Component } from "react";
import "./like.css";
class Like extends Component {
  render() {
    let className = "likeIcon fa fa-heart";
    const { onClick } = this.props;
    return (
      <i
        className={
          (className = this.props.object.liked ? className : className + "-o")
        }
        aria-hidden="true"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      ></i>
    );
  }
}

export default Like;
