import React, { Component } from "react";
export default class TableHeader extends Component {
  // props should be dystructured here for convenient use
  raiseSort = (path) => {
    // * instead of path this function passes sortColumn object
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  iconDirection(column) {
    if (column.path) {
      const { sortColumn } = this.props;
      let className = "fa fa-sort";
      className += sortColumn.order === "asc" ? "-asc" : "-desc";
      return className;
    }
    return;
  }
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr key={"header"} style={{ cursor: "pointer" }}>
          {columns.map((col) => (
            <th
              key={col.label || col.key}
              onClick={() => this.raiseSort(col.path)}
            >
              {col.label} <i className={this.iconDirection(col)}></i>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
