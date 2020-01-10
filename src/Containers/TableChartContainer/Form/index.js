import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../../Components/Select';
import Button from '../../../Components/Button';
import Filter from '../../../Components/Filter';
import CheckBoxFilter from './CheckBoxFilter';

import { FormWrapper } from './styles';

const Form = props => {
  const {
    products,
    onHandleSubmit,
    onHandleSelectProductId,
    onHandleChange,
    onHandleFilter,
    searchValue,
    filterByMax,
    filterByMin,
    filterByAvg,
    isDisabled,
    isProductSelected,
  } = props;

  const getTitle = () => {
    if (isProductSelected) {
      return 'Update product';
    }

    return ' Add product to graph';
  };

  return (
    <FormWrapper>
      <Select
        options={products}
        onHandleSelect={onHandleSelectProductId}
        searchValue={searchValue}
        title="Select Product"
      />
      <Filter onHandleChange={onHandleChange} searchValue={searchValue} />
      <CheckBoxFilter
        onHandleFilter={onHandleFilter}
        displayMax={filterByMax}
        displayMin={filterByMin}
        displayAvg={filterByAvg}
      />
      <Button onHandleClick={onHandleSubmit} isDisabled={isDisabled}>
        {getTitle()}
      </Button>
    </FormWrapper>
  );
};

Form.propTypes = {
  products: PropTypes.array,
  onHandleSubmit: PropTypes.func,
  searchValue: PropTypes.string,
  onHandleSelectProductId: PropTypes.func,
  onHandleChange: PropTypes.func,
  onHandleFilter: PropTypes.func,
  filterByMax: PropTypes.bool,
  filterByMin: PropTypes.bool,
  filterByAvg: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isProductSelected: PropTypes.bool,
};

export default Form;
