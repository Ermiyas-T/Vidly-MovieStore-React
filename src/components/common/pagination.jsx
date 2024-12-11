import React from "react";
const Pagination = (props) => {
  const { currentPage, totalItemsLength, pageSize, onPageChange } = props;
  let totalPages = Math.ceil(totalItemsLength / pageSize);
  const pages = [];
  if (totalPages > 0) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else return null;
  if (totalPages === 1) return null;
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li key={page} className={listClassName(currentPage, page)}>
              <a
                className="page-link"
                href="#button"
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
function listClassName(currentSystemPage, page) {
  let liClassName = "page-item";
  return (liClassName += page === currentSystemPage ? " active" : "");
}
export default Pagination;
// the total list items = number of pages
// to handle pageChange : the clicked page number should pass as an argument and make change the current page value
// the displayed content also should be according to the page size and total movie count
