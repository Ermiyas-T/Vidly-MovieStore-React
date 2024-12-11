import React from "react";

const ListGroup = ({
  allItems,
  onItemSelect,
  selectedItem,
  textProperty = "name",
  valueProperty = "_id",
}) => {
  let liGroupClassName = "list-group-item ";
  return (
    <ul className="list-group">
      {allItems.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? liGroupClassName + "active"
              : liGroupClassName
          }
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
// ListGroup.defaultProps = {
//   textProperty: "name",
//   valueProperty: "_id",
// };

export default ListGroup;
/////////////////////////////////////////////////////////////////////////////
