import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../utils/theme';

const Button = styled.button`
  background: ${props => theme.button[props.type].background};
  border: none;
  color: #fff;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 40%;
  height: 10%;
  cursor: pointer;
  text-decoration: none;
  transition: all ease 0.3s;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'remove']),
};

Button.defaultProps = {
  type: 'default',
};
