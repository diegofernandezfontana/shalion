import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = props => {
  const { onHandleClick, isChecked, label } = props;

  return (
    <div>
      <input type="checkbox" onClick={onHandleClick} checked={isChecked} htmlFor={label} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

CheckBox.defaultProps = {
  isChecked: false,
  label: 'Checked',
};

CheckBox.propTypes = {
  label: PropTypes.string,
  onHandleClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default CheckBox;
