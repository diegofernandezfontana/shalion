import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { SelectWrapper, SelectTitle } from './styles';

const Select = props => {
  const { onHandleSelect, options, searchValue, title } = props;

  const getValue = option => {
    if (option && option.id) {
      return option.id;
    }
    if (option && option.value) {
      return option.value;
    }

    return null;
  };

  const renderOptions = () => {
    return options
      .filter(option => {
        return option.name.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map(option => {
        return (
          <option value={getValue(option)} key={option.id}>
            {option.name}
          </option>
        );
      });
  };

  return (
    <Fragment>
      <SelectTitle> {title} </SelectTitle>
      <SelectWrapper onClick={onHandleSelect}>{renderOptions()}</SelectWrapper>
    </Fragment>
  );
};

Select.defaultProps = {
  options: [],
  onHandleSelect: () => {},
  searchValue: '',
  title: 'Select: ',
};

Select.propTypes = {
  onHandleSelect: PropTypes.func,
  options: PropTypes.array,
  searchValue: PropTypes.string,
  title: PropTypes.string,
};
export default Select;
