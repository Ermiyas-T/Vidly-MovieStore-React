const Delete = (props) => {
  const { onClick } = props;
  return (
    <button className="btn btn-danger btn-sm" onClick={onClick}>
      Delete
    </button>
  );
};
export default Delete;
