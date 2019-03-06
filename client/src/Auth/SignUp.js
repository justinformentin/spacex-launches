import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { registerUser } from '../store/actions/actions';
import classnames from 'classnames';
import {Container, Wrapper, InputWrapper, ButtonWrapper, Button, ErrorText} from './auth.styled.js';

class SignUp extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      error: {},
    }
  }

  componentDidMount = () => {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error
      });
    }
  }

  handleSign = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendSign = e => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }

    this.props.registerUser(userData, this.props.history)
  }

  render() {
    const { error } = this.state
    return (
      <Container>
        <Wrapper>
          <InputWrapper>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleSign}
              error={error.name}
              className={classnames("", { invalid: error.name })}/>
            <br />
            <ErrorText>{error.name}</ErrorText>

            <input
              type="text"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleSign}
              error={error.email}
              className={classnames("", { invalid: error.email })}
             />
             <br />
             <ErrorText>{error.email}</ErrorText>

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleSign}
              error={error.password}
              className={classnames("", { invalid: error.password })}
            />
            <br />
            <ErrorText>{error.password}</ErrorText>
            </InputWrapper>
            <ButtonWrapper>
              <Button type="submit" onClick={this.sendSign}>Sign Up</Button>
              <Link to="/Login">Login</Link>
              <Link to="/">Home</Link>
            </ButtonWrapper>
        </Wrapper>
      </Container>
    )
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.userAuth,
  error: state.errors
})


export default connect(mapStateToProps, { registerUser })(withRouter(SignUp))