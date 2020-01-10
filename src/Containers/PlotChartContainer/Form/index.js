import React from 'react';
import PropTypes from 'prop-types';

import Filter from '../../../Components/Filter';
import Button from '../../../Components/Button';
import Select from '../../../Components/Select';
import CheckBoxFilter from './CheckBoxFilter';

import { retailers } from '../../../utils/retailers';

import { FormWrapper, Text, CloseButton, ProductsListWrapper, SelectedProductWrapper } from './styles';

const Form = props => {
  const {
    products,
    onHandleSelectProductId,
    onHandleAddProductClick,
    onHandleChange,
    displayedItems,
    searchValue,
    onHandleRemoveItem,
    onHandleDisplayDots,
    onHandleDisplayTendency,
    displayDots,
    displayTendencyLine,
    onHandleSelectRetailer,
    isButtonDisabled,
  } = props;

  const renderSelectedProducts = () => {
    return displayedItems.map(product => {
      return (
        <SelectedProductWrapper key={`${product.id} + ${product.retailer}`}>
          <Text>
            {product.productName} - {product.retailer}{' '}
          </Text>
          <CloseButton
            key={`${product.id} + ${product.retailer}`}
            onClick={onHandleRemoveItem({ productIdToRemove: product.id, retailerToRemove: product.retailer })}
          >
            X
          </CloseButton>
        </SelectedProductWrapper>
      );
    });
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
      <Select options={retailers} onHandleSelect={onHandleSelectRetailer} title="Filter by Retailer" />
      <Button onHandleClick={onHandleAddProductClick} isDisabled={isButtonDisabled}>
        Add product to graph
      </Button>
      <CheckBoxFilter
        onHandleDisplayDots={onHandleDisplayDots}
        onHandleDisplayTendency={onHandleDisplayTendency}
        displayDots={displayDots}
        displayTendencyLine={displayTendencyLine}
      />
      <ProductsListWrapper>{renderSelectedProducts()}</ProductsListWrapper>
    </FormWrapper>
  );
};

Form.propTypes = {
  products: PropTypes.array,
  onHandleSelectProductId: PropTypes.func,
  onHandleAddProductClick: PropTypes.func,
  onHandleSelectRetailer: PropTypes.func,
  onHandleRemoveItem: PropTypes.func,
  onHandleDisplayDots: PropTypes.func,
  onHandleDisplayTendency: PropTypes.func,
  onHandleChange: PropTypes.func,
  searchValue: PropTypes.string,
  selectedProductsToDisplay: PropTypes.array,
  displayedItems: PropTypes.array,
  displayDots: PropTypes.bool,
  displayTendencyLine: PropTypes.bool,
  isButtonDisabled: PropTypes.bool,
};

export default Form;
