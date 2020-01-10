import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import PlotChart from '../../Components/Charts/PlotChart';
import Form from './Form';

import getxAxisTickDate from '../../Components/Charts/utils/xAxisTickDate';
import { retailers, getRetailerColors } from '../../utils/retailers';
import { Wrapper } from './styles';

import { DataContext } from '../../DataContext';

const PlotChartContainer = () => {
  const { products, productsData } = useContext(DataContext);
  const [selectedProductId, setSelectedProductId] = useState();
  const [displayTendencyLine, setDisplayTendencyLine] = useState(true);
  const [displayDots, setDisplayDots] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [retailerFilter, setRetailerFilter] = useState('');
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    const convertedData = data.map(prod => {
      const firstItem = prod[0];

      return {
        productName: firstItem.productName,
        id: firstItem.id,
        color: firstItem,
        retailer: firstItem.retailer,
      };
    });

    setDisplayedItems(convertedData);
  }, [data.length]);

  const getMonthlyProduct = () => {
    const selectedProdIndex = productsData.findIndex(elem => elem.id === selectedProductId);
    const monthlyProduct = [];

    for (let i = 0; i < 30; i++) {
      monthlyProduct.push(productsData[selectedProdIndex + i]);
    }

    return monthlyProduct;
  };

  const getProductPrice = ({ product }) => {
    if (product && product[retailerFilter.value]) {
      return product[retailerFilter.value];
    }

    return 0;
  };

  const getProductStats = ({ monthlyProduct }) => {
    return monthlyProduct.map(product => {
      return {
        price: getProductPrice({ product }),
        date: getxAxisTickDate(product.fetch_date),
        color: getRetailerColors(retailerFilter.value),
        productName: product.name,
        id: product.id,
        retailer: retailerFilter.name,
      };
    });
  };

  const handleAddProductClick = () => {
    const monthlyProduct = getMonthlyProduct();
    const getConvertedProduct = getProductStats({ monthlyProduct });

    setData([...data, getConvertedProduct]);
  };

  const handleRemoveItem = ({ productIdToRemove, retailerToRemove }) => () => {
    const filteredProducts = data.filter((monthlyProd, index) => {
      const product = monthlyProd[0];

      return !(product.id === productIdToRemove && product.retailer === retailerToRemove);
    });

    setData(filteredProducts);
  };

  const handleSelectProductId = event => {
    setSelectedProductId(parseInt(event.target.value));
  };

  const handleSelectRetailer = event => {
    const retailerValue = event.target.value;
    const retailerIndex = retailers.findIndex(retailer => retailer.value === retailerValue);
    const filterBy = retailers[retailerIndex];

    setRetailerFilter(filterBy);
  };

  const handleDisplayTendency = () => {
    setDisplayTendencyLine(!displayTendencyLine);
  };

  const handleDisplayDots = () => {
    setDisplayDots(!displayDots);
  };

  const handleChange = value => {
    setSearchValue(value);
  };

  const isButtonDisabled = () => {
    if (!selectedProductId || !Object.keys(retailerFilter).length) {
      return true;
    }
    if (selectedProductId && Object.keys(retailerFilter).length) {
      const isProductInChart = displayedItems.filter(displayedProd => {
        return displayedProd.id === selectedProductId && displayedProd.retailer === retailerFilter.name;
      });

      return isProductInChart.length > 0;
    }

    return false;
  };

  const getProductsIds = () => {
    if (data.length) {
      return data.map(monthlyProd => {
        return monthlyProd[0].id;
      });
    }

    return [];
  };

  return (
    <Wrapper>
      <Form
        onHandleSelectProductId={handleSelectProductId}
        onHandleChange={handleChange}
        displayedItems={displayedItems}
        onHandleAddProductClick={handleAddProductClick}
        onHandleRemoveItem={handleRemoveItem}
        onHandleDisplayDots={handleDisplayDots}
        onHandleDisplayTendency={handleDisplayTendency}
        onHandleSelectRetailer={handleSelectRetailer}
        products={products}
        searchValue={searchValue}
        displayDots={displayDots}
        displayTendencyLine={displayTendencyLine}
        isButtonDisabled={isButtonDisabled()}
      />
      <PlotChart
        data={data}
        productsIds={getProductsIds()}
        displayTendencyLine={displayTendencyLine}
        displayDots={displayDots}
      />
    </Wrapper>
  );
};

PlotChartContainer.propTypes = {
  products: PropTypes.array,
  productsData: PropTypes.array,
};

export default PlotChartContainer;
