import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../store/actions/actions';

const Container = styled.div`
  background: #d1d4da;
  margin-bottom: 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
`;

const Wrapper = styled.div`
  width: 30%;
  margin: 0 auto;
  @media only screen and (max-width: 1020px) {
    width: 50%;
  }
  @media only screen and (max-width: 768px) {
    width: 75%;
  }
`;

const Title = styled.h1`
  text-align: center;
  padding-top: 0.5rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
`;

const StyledLink = styled(Link)`
  color: #000;
  padding: 0 1rem;
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  justify-content: center;
  transition: all ease 0.3s;
  &:hover {
    transform: translateY(-2px);
    color: #666;
  }
`;

class Header extends Component {
  logoutUser = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Container>
        <Wrapper>
          <Title>SpaceX Launch List</Title>
          <LinkWrapper className="">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/saved">Saved</StyledLink>
            {this.props.auth.isAuthenticated ? (
              <StyledLink to="/" onClick={this.logoutUser}>
                Logout
              </StyledLink>
            ) : (
              <StyledLink to="/login">Login</StyledLink>
            )}
          </LinkWrapper>
        </Wrapper>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.userAuth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
