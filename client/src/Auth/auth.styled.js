import styled from 'styled-components';
import galaxy from '../assets/galaxy.jpg'

export const Container = styled.div`
  background: url(${galaxy}) no-repeat center;
  background-size: auto;
  width: 100%;
  height: 100vh;
  overflow: none;
  display: flex;
}
`;

export const Wrapper = styled.div`
  padding: 2rem;
  border-radius: 7px;
  background-color: #fff;
  margin: auto;
  text-align: center;
  width: 25%;
  @media only screen and (max-width: 1080px) {
    width: 35%
  }
  @media only screen and (max-width: 768px) {
    width: 50%
  }
  @media only screen and (max-width: 480px) {
    width: 70%
  }
`;

export const InputWrapper = styled.div`
  height: 200px;
  input{
    border: none;
    border-bottom: 2px solid red;
    padding: 0.5rem;
    margin: 0.5rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Button = styled.button`
    margin: 1rem auto;
    width: 50%;
    padding: 0.5rem;
    background-color: rgba(248, 20, 20, 0.7);
    border: none;
    color: #ffffff;
    cursor: pointer;
`;

export const ErrorText = styled.span`
    color: red;
`;