import React, { useEffect, useState } from 'react';

import Navbar from './Components/Navbar';
import { DataContext } from './DataContext';
import MainRouter from './Router';

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://shalion-challenge.s3.us-east-2.amazonaws.com/shalion_201912211354_revlonprices.json';

    fetch(proxyUrl + targetUrl)
      .then(response => response.json())
      .then(json => {
        const { data } = json;

        setProductsData(data);
      });
  }, []);

  useEffect(() => {
    if (productsData.length) {
      const productsArr = [];

      for (let i = 0; i < productsData.length; i += 30) {
        const item = productsData[i];

        productsArr.push({ id: item.id, name: item.name });
      }
      setProducts(productsArr);
    }
  }, [productsData]);

  return (
    <div className="App">
      <DataContext.Provider value={{ productsData, products }}>
        <Navbar />
        <MainRouter />
      </DataContext.Provider>
    </div>
  );
};

export default App;
