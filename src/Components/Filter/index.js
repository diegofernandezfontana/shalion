import React from 'react';
import PropTypes from 'prop-types';

import { InputWrapper } from './styles';

const Filter = props => {
  const { onHandleChange, searchValue } = props;

  const handleChange = event => {
    onHandleChange(event.target.value);
  };

  return <InputWrapper onChange={handleChange} value={searchValue} placeholder="Filter by product name..." />;
};

Filter.propTypes = {
  onHandleChange: PropTypes.func,
  searchValue: PropTypes.string,
};

export default Filter;
