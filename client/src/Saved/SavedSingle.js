import React from 'react'
import Item from '../Shared/Item'
import Button from '../Layout/Button';
import { Wrapper, ButtonWrapper, ButtonLink } from '../Shared/launch.style';

const Saved  = ({ launch }) => {
  return(
    <Wrapper>
      <Item
        badge={launch.badge}
        name={launch.missionName}
        rocket={launch.rocketName}
        flight={launch.flightNumber}
        type={launch.rocketType}
        date={launch.launchDate}
      />
      <ButtonWrapper>
          <Button>
            <ButtonLink to={`/launch/${launch.flightNumber}`}>More Info</ButtonLink>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Saved
