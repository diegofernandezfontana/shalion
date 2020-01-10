/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { select, axisBottom, axisLeft, scaleLinear, scaleBand, max } from 'd3';

import { SvgWrapper, SvgContainer } from '../styles';

import useResizeObserver from '../utils/useResizeObserver';

const getPriceValue = price => {
  if (price) {
    return price.toFixed(2);
  }

  return 0;
};

const PlotChart = props => {
  const { data } = props;
  const svgRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    //Removes previous bars
    if (data.length) {
      const svg = select(svgRef.current);

      svg.selectAll('.bar').remove();
    }
  }, [data]);

  useEffect(() => {
    if (data.length) {
      const svg = select(svgRef.current);

      const maxPrice = max(data, d => d.value);

      if (!dimensions) return;
      const { width, height } = dimensions;

      const xScale = scaleBand()
        .domain(data.map((d, index) => index))
        .range([0, width])
        .padding(0.5);

      const yScale = scaleLinear()
        .domain([0, maxPrice + maxPrice * 0.1])
        .range([height, 0]);

      const xAxis = axisBottom(xScale)
        .ticks(data.length)
        .tickFormat((value, index) => {
          return data[index].retailerName;
        });

      const yAxis = axisLeft(yScale).tickFormat(d => d + '$');

      svg
        .select('.x-axis')
        .style('transform', `translateY(${height}px)`)
        .style('color', '#8c8c8c')
        .call(xAxis);

      svg
        .select('.x-axis')
        .selectAll('.tick')
        .filter(item => {
          return item % 2 !== 0;
        })
        .select('text')
        .style('transform', 'translateY(20px)');

      svg
        .select('.y-axis')
        .style('color', '#8c8c8c')
        .call(yAxis);

      svg.selectAll('text').style('font-size', '1rem');

      svg
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .style('transform', 'scale(1,-1)')
        .attr('width', xScale.bandwidth())
        .attr('fill', d => {
          return d.color;
        })
        .attr('x', (value, index) => xScale(index))
        .attr('y', `-${height}`)
        .on('mouseenter', (value, index) => {
          svg
            .selectAll('.tooltip')
            .data([value])
            .join('text')
            .text(getPriceValue(value.value))
            .attr('class', 'tooltip')
            .attr('x', xScale(index) + xScale.bandwidth() / 2)
            .attr('y', yScale(value.value) - 10)
            .attr('text-anchor', 'middle')
            .transition()
            .attr('opacity', 1);
        })
        .on('mouseleave', (value, index) => {
          svg.select('.tooltip').remove();
        })
        .transition()
        .attr('height', product => {
          return height - yScale(product.value);
        });
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
};

export default PlotChart;
