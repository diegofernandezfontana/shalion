import styled from 'styled-components';
import { rem } from 'polished';

const button = {
  color: 'white',
  fontSize: rem(16),
  disabledColor: '#c3c3c3',
  backgroundColor: '#3951a5',
  padding: `${rem(8)} ${rem(16)}`,
};

const getComputedStyles = ({ disabled }) => `
  background-color: ${disabled ? button.disabledColor : button.backgroundColor};
  color: ${button.color};
  border: 1px solid ${disabled ? button.disabledColor : button.backgroundColor};

  &:hover {
    cursor: ${disabled ? 'not-allowed ' : 'pointer'};
    background-color: ${disabled ? button.disabledColor : button.backgroundColor};;
  }
`;

export const ButtonContainer = styled.button`
  max-width: 200px;
  padding: ${button.padding};
  font-size: ${button.fontSize};
  border: 1px solid #25356d;
  background-color: ${button.backgroundColor};
  border-radius: 4px;
  color: ${button.color};
  transition: 0.2s;

  ${props => getComputedStyles(props)}
`;
