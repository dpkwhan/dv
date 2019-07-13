import React, { Component } from "react";
import autoBind from "react-autobind";
import { Icon } from "antd";

class Todo extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  render() {
    return (
      <div>
        <Icon type="plus-square-o" style={{ fontSize: 60, color: "#08c" }} />{" "}
        Coming soon
      </div>
    );
  }
}

export default Todo;
