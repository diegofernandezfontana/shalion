/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import { select, axisBottom, axisLeft, scaleLinear, scaleBand, max, curveCardinal, line } from 'd3';
import PropTypes from 'prop-types';

import { SvgWrapper, SvgContainer } from '../styles';

import useResizeObserver from '../utils/useResizeObserver';

const PlotChart = props => {
  const { displayDots, displayTendencyLine, data } = props;
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    //Effect to remove tendency line
    const svg = select(svgRef.current);

    if (!displayTendencyLine) {
      svg.selectAll('path').remove();
    }
  }, [displayTendencyLine]);

  useEffect(() => {
    //Effect to remove Dots
    const svg = select(svgRef.current);

    if (!displayDots) {
      svg.selectAll('circle').remove();
    }
  }, [displayDots]);

  const getMaxPriceOfSelectedProducts = () => {
    const maxOfAll = max(
      data.map(monthlyProd => {
        const maxOfMonth = max(monthlyProd, prod => {
          return prod.price;
        });

        return maxOfMonth;
      }),
    );

    return maxOfAll;
  };

  useEffect(() => {
    if (!data.length) {
      const svg = select(svgRef.current);

      svg.selectAll('svg > path').remove();
      svg.selectAll('svg > circle').remove();
    }
  }, [data.length]);

  useEffect(() => {
    if (data.length) {
      const svg = select(svgRef.current);
      const maxPriceOfProducts = getMaxPriceOfSelectedProducts();

      svg.selectAll('svg > path').remove();
      svg.selectAll('svg > circle').remove();

      if (!dimensions) return;
      const { width, height } = dimensions;

      const xScale = scaleBand()
        .domain(data[0].map((produc, index) => index))
        .range([0, width])
        .padding(1);

      const yScale = scaleLinear()
        .domain([0, maxPriceOfProducts + maxPriceOfProducts * 0.2])
        .range([height, 0]);

      const xAxis = axisBottom(xScale)
        .ticks(30)
        .tickFormat((tickNum, maindx) => {
          return data[0][tickNum].date;
        });

      const yAxis = axisLeft(yScale).tickFormat((d, index) => {
        return d + '$';
      });

      const tendencyLine = line()
        .x((value, index) => xScale(index))
        .y(value => yScale(value))
        .curve(curveCardinal);

      svg.selectAll('text').style('font-size', '0.7rem');

      svg
        .select('.x-axis')
        .style('transform', `translateY(${height}px)`)
        .style('color', '#8c8c8c')
        .call(xAxis);

      svg
        .select('.y-axis')
        .style('color', '#8c8c8c')
        .call(yAxis);

      svg.selectAll('.tick').style('color', '#3e3e3e');

      if (displayDots) {
        const renderPoints = data.map((monthlyProduct, index) => {
          const product = monthlyProduct[index];
          const productId = product.id;
          const productColor = product.color;

          svg.selectAll('.circle').remove();
          svg
            .selectAll(`.circle${productId}`)
            .data(monthlyProduct.filter(prod => prod.price))
            .join('circle')
            .attr('id', d => d.id)
            .attr('class', `circle${productId}+${productColor}`)
            .attr('r', 5)
            .on('mouseenter', (dailyProd, index) => {
              svg
                .selectAll('.tooltip')
                .data([dailyProd])
                .join('text')
                .attr('class', 'tooltip')
                .text(`${product.productName} - ${dailyProd.price}$`)
                .attr('x', xScale(index) + xScale.bandwidth() / 2)
                .attr('y', yScale(dailyProd.price) - 15)
                .attr('text-anchor', 'middle');
            })
            .on('mouseleave', (value, index) => svg.select('.tooltip').remove())
            .transition()
            .attr('fill', product.color)
            .attr('width', xScale.bandwidth())
            .attr('cy', d => yScale(d.price))
            .attr('cx', (value, index) => xScale(index));
        });
      }

      if (displayTendencyLine) {
        const renderLine = data.map((monthlyProduct, index) => {
          const product = monthlyProduct[index];
          const productId = product.id;
          const prodData = monthlyProduct.map((products, prodIndex) => products.price);

          svg
            .selectAll(`.path${productId}`)
            .data([prodData])
            .join('path')
            .attr('class', `.path${productId}`)
            .attr('d', (d, idx) => tendencyLine(d))
            .attr('stroke', product.color)
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .on('mouseover', (value, index) => {
              svg
                .selectAll('.tooltip')
                .data([value])
                .join('text')
                .attr('class', 'tooltip')
                .text(`${product.productName}`)
                .attr('x', width / 2)
                .attr('y', yScale(value) - 8)
                .attr('text-anchor', 'middle');
            })
            .on('mouseleave', (value, index) => svg.select('.tooltip').remove());
        });
      }
    }
  }, [data, dimensions]);

  return (
    <SvgWrapper ref={wrapperRef}>
      <SvgContainer ref={svgRef} className="plot-chart">
        <g className="x-axis" />
        <g className="y-axis" />
      </SvgContainer>
    </SvgWrapper>
  );
};

PlotChart.propTypes = {
  data: PropTypes.array,
  displayDots: PropTypes.bool,
  displayTendencyLine: PropTypes.bool,
};

export default PlotChart;
