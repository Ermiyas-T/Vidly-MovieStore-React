import React, { Component } from "react";
import _ from "lodash";
import "./tableBody.css";
export default class TableBody extends Component {
  // const bodyRow
  renderCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  }
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              {columns.map((column) => {
                return (
                  <td key={column.label || column.key}>
                    {this.renderCell(item, column)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}
