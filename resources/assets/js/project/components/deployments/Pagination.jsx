import React from 'react';

const Pagination = (props) => (null);

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  per_page: PropTypes.number.isRequired,
  current_page: PropTypes.number.isRequired,
  last_page: PropTypes.number.isRequired,
};

export default  Pagination;
