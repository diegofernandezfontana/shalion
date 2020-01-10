import React from 'react';
import PropTypes from 'prop-types';

import CheckBox from '../../../../Components/CheckBox';

import { CheckBoxWrapper } from './styles';

const CheckBoxFilter = props => {
  const { onHandleFilter, displayMin, displayMax, displayAvg } = props;

  return (
    <CheckBoxWrapper>
      <CheckBox onHandleClick={onHandleFilter('avg')} label={'Display average price'} isChecked={displayAvg} />
      <CheckBox onHandleClick={onHandleFilter('min')} label={'Display min price'} isChecked={displayMin} />
      <CheckBox onHandleClick={onHandleFilter('max')} label={'Display max price'} isChecked={displayMax} />
    </CheckBoxWrapper>
  );
};

CheckBoxFilter.propTypes = {
  onHandleFilter: PropTypes.func,
  displayMax: PropTypes.bool,
  displayMin: PropTypes.bool,
  displayAvg: PropTypes.bool,
};

export default CheckBoxFilter;
