import React, { useState, useContext } from 'react';
import { max, min, mean } from 'd3';
import PropTypes from 'prop-types';

import TableChart from '../../Components/Charts/TableChart';
import Form from './Form';
import { retailers, getRetailerColors } from '../../utils/retailers';

import { Wrapper, ChartTitle } from './styles';

import { DataContext } from '../../DataContext';

const TableChartContainer = () => {
  const { products, productsData } = useContext(DataContext);
  const [searchValue, setSearchValue] = useState();
  const [selectedProductId, setSelectedProductId] = useState();
  const [data, setData] = useState([]);
  const [filterByAvg, setFilterByAvg] = useState(true);
  const [filterByMin, setFilterByMin] = useState(false);
  const [filterByMax, setFilterByMax] = useState(false);

  const handleSelect = event => {
    setSelectedProductId(parseInt(event.target.value));
  };

  const handleChange = inputValue => {
    setSearchValue(inputValue);
  };

  const handleSubmit = () => {
    setData(getData());
  };

  const handleFilter = filterValue => () => {
    if (filterValue === 'avg' && (filterByMax || filterByMin)) {
      setFilterByAvg(!filterByAvg);
    }
    if (filterValue === 'max' && (filterByAvg || filterByMin)) {
      setFilterByMax(!filterByMax);
    }
    if (filterValue === 'min' && (filterByAvg || filterByMax)) {
      setFilterByMin(!filterByMin);
    }
  };

  const getMonthlyProductData = () => {
    const idxProductInArr = productsData.findIndex(elem => elem.id === selectedProductId);

    const productForMonth = [];

    if (productsData.length) {
      for (let i = 1; i <= 30; i++) {
        productForMonth.push(productsData[idxProductInArr + i]);
      }
    }

    return productForMonth;
  };

  const getValue = retailer => {
    const monthlyProduct = getMonthlyProductData();

    if (filterByMax) {
      return max(monthlyProduct, d => d[retailer]);
    }
    if (filterByMin) {
      return min(monthlyProduct, d => d[retailer]);
    }

    return mean(monthlyProduct, d => d[retailer]);
  };

  const getData = () => {
    return retailers.map(retailer => {
      return {
        value: getValue(retailer.value),
        retailerName: retailer.name,
        color: getRetailerColors(retailer.value),
      };
    });
  };

  const isButtonDisabled = () => {
    if ((filterByMin && filterByMax) || (filterByAvg && filterByMax) || (filterByAvg && filterByMin)) {
      return true;
    }

    return false;
  };

  const isProductSelected = () => {
    return data.length > 0;
  };

  return (
    <Wrapper>
      <Form
        onHandleSelectProductId={handleSelect}
        onHandleChange={handleChange}
        onHandleFilter={handleFilter}
        products={products}
        onHandleSubmit={handleSubmit}
        searchValue={searchValue}
        filterByAvg={filterByAvg}
        filterByMax={filterByMax}
        filterByMin={filterByMin}
        isDisabled={isButtonDisabled()}
        isProductSelected={isProductSelected()}
      />
      <ChartTitle> Monthly product stats:</ChartTitle>
      <TableChart productsData={productsData} data={data} />
    </Wrapper>
  );
};

TableChartContainer.propTypes = {
  products: PropTypes.array,
  productsData: PropTypes.array,
};

export default TableChartContainer;
