import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  @media only screen and (min-width: 1200px) {
    flex-flow: row-wrap;
  }
`;

export const Wrapper = styled.div`
  width: 95%;
  min-height: 50px;
  margin: 5% auto;
  text-align: center;
  border-radius: 7px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.3);
  background: #d1d4da;
  padding: 1.5rem 0.5rem;
  margin: 0.5rem;
  @media only screen and (min-width: 1200px) {
    max-width: 30%;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: 1rem;
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;
