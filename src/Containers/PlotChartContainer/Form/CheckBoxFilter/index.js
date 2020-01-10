import React from 'react';
import PropTypes from 'prop-types';

import { CheckBoxesWrapper, CheckBoxGroup } from './styles';

const CheckBoxFilter = ({ onHandleDisplayDots, onHandleDisplayTendency, displayDots, displayTendencyLine }) => {
  return (
    <CheckBoxesWrapper>
      <CheckBoxGroup>
        <input type="checkbox" onClick={onHandleDisplayDots} checked={displayDots} />
        <label>Display Dots</label>
      </CheckBoxGroup>
      <CheckBoxGroup>
        <input type="checkbox" onClick={onHandleDisplayTendency} checked={displayTendencyLine} />
        <label>Display tendency line</label>
      </CheckBoxGroup>
    </CheckBoxesWrapper>
  );
};

CheckBoxFilter.propTypes = {
  onHandleDisplayDots: PropTypes.func,
  onHandleDisplayTendency: PropTypes.func,
  displayDots: PropTypes.bool,
  displayTendencyLine: PropTypes.bool,
};

export default CheckBoxFilter;
