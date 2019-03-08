import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../store/actions/actions';
import classnames from 'classnames';
import {
  Container,
  Wrapper,
  InputWrapper,
  ButtonWrapper,
  Button,
  ErrorText,
} from './auth.styled.js';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: {},
    };
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
      });
    }
  }

  handleLogin = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitUser = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { error } = this.state;
    return (
      <Container>
        <Wrapper>
          <InputWrapper>
            <form onSubmit={this.submitUser}>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleLogin}
                error={error.email}
                className={classnames('', {
                  invalid: error.email || error.emailNotFound,
                })}
              />
              <br />
              <ErrorText>
                {error.email}
                {error.emailNotFound}
              </ErrorText>

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleLogin}
                error={error.password}
                className={classnames('', {
                  invalid: error.password || error.passwordIncorrect,
                })}
              />

              <ErrorText>
                {error.password}
                {error.passwordIncorrect}
              </ErrorText>
              <Button type="submit">Login</Button>
            </form>
          </InputWrapper>
          <ButtonWrapper>
            <Link to="/signup">Create account</Link>
            <Link to="/">Home</Link>
          </ButtonWrapper>
        </Wrapper>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.userAuth,
  error: state.errors,
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
