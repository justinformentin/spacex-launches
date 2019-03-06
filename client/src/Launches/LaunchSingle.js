import React from 'react';
import axios from 'axios';
import {format} from 'date-fns'
import { successNotify } from '../utils/notify';
import Item from '../Shared/Item'
import Button from '../Layout/Button'
import { Wrapper, ButtonWrapper, ButtonLink } from '../Shared/launch.style';

const LaunchSingle = ({ launch }) => {

  const saveLaunch = () => {
    axios.post('/api/launches/save', {
      badge: launch.links.mission_patch,
      missionName: launch.mission_name,
      rocketName: launch.rocket.rocket_name,
      flightNumber: launch.flight_number,
      rocketType: launch.rocket.rocket_type,
      launchDate: format(launch.launch_date_utc, 'MM/DD/YYYY'),
      photo: launch.links.flickr_images[0]
    })
    successNotify(launch.mission_name);
  }

  return (
    <Wrapper>
      <Item
        badge={launch.links.mission_patch}
        name={launch.mission_name}
        rocket={launch.rocket.rocket_name}
        flight={launch.flight_number}
        type={launch.rocket.rocket_type}
        date={format(launch.launch_date_utc, 'MM/DD/YYYY')}
      />
      <ButtonWrapper>
        <Button
          type="primary"
          onClick={saveLaunch}
        >Save</Button>
        <Button>
          <ButtonLink to={`/launch/${launch.flight_number}`}>More Info</ButtonLink>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
};
// }

export default LaunchSingle;
