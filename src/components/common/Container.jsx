import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="max-w-[1920px] w-full mx-auto px-4">{children}</div>;
};

Container.propTypes = {
    children: PropTypes.node,
}

export default Container;
