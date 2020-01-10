import React from 'react';
import PropTypes from 'prop-types';

import { ButtonContainer } from './styles';

const Button = props => {
  const { onHandleClick, children, isDisabled } = props;

  return (
    <ButtonContainer onClick={onHandleClick} disabled={isDisabled}>
      {children}
    </ButtonContainer>
  );
};

Button.propTypes = {
  onHandleClick: PropTypes.func,
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
