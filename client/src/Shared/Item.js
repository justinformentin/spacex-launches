import React from 'react';
import styled from 'styled-components';
import noBadge from '../assets/nobadge.svg';

const TextWrap = styled.div`
  p {
    padding: 0.25rem 0;
  }
`;

const LaunchItem = ({ badge, name, rocket, flight, type, date }) => {

  return (
    <React.Fragment>
    {
      badge
      ? <img src={badge} height="125px" alt="mission_patch"/>
      : <img src={noBadge} height="125px" alt="No Badge"/>
    }
      <TextWrap>
        <h2>{name}</h2>
        <p>Rocket Name: {rocket}</p>
        <p>Flight Number: {flight}</p>
        <p>Rocket Type: {type}</p>
        <p>Launch Date: {date}</p>

      </TextWrap>
    </React.Fragment>
  )
};

export default LaunchItem;