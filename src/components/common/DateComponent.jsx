import PropTypes from "prop-types";

const DateComponent = ({ createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-CA");
  return <span>{formattedDate}</span>;
};

DateComponent.propTypes = {
  createdAt: PropTypes.string.isRequired,
};

export default DateComponent;
