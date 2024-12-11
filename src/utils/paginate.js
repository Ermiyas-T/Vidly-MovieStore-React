import _ from "lodash";
export default function paginate(totalItems, currentPageNumber, pageSize) {
  let beginningIndex = (currentPageNumber - 1) * pageSize;
  return _(totalItems).slice(beginningIndex).take(pageSize).value();
}
