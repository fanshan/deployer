import React, { PropTypes } from 'react';

const Icon = (props) => {
  let iconClasses = props.fa;

  // Accept string class names for convenience, but we'll use an array for mapping here
  if (typeof props.fa === 'string') {
    iconClasses = [props.fa];
  }

  if (props.spin) {
    iconClasses.push('spinner');
  }

  return (
    <i className={`fa ${iconClasses.map((icon) => (`fa-${icon}`)).join(' ')} ${props.className}`} />
  );
};

Icon.propTypes = {
  fa: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  className: PropTypes.string,
  spin: PropTypes.bool,
};

Icon.defaultProps = {
  spin: false,
};

export default Icon;
