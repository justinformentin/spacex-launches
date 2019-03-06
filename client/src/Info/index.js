import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { format } from 'date-fns';
import { getNestedObject} from '../utils/getNestedObject';
import { Loader } from '../utils/loader';
import { successNotify } from '../utils/notify';
import Layout from '../Layout';
import Button from '../Layout/Button';
import noBadge from '../assets/nobadge.svg';

const Container = styled.div`
  background: #d1d4da;
  margin: 0 auto;
  width: 60%;
  border-radius: 7px;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
  display: flex;
  margin-bottom: 2rem;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
  width: 75%
  }
  @media only screen and (max-width: 960px) {
  width: 80%
  }
  @media only screen and (max-width: 768px) {
  width: 85%
  }
  @media only screen and (max-width: 640px) {
  width: 95%
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 2rem 5rem;
  text-align: center;
  flex: 1;
  justify-content: center;
  h3, p{
  margin-bottom: 0.5rem;
  }
  @media only screen and (max-width: 768px) {
  }
`;

const Img = styled.img`
  margin: 1rem 0rem;
  width: auto;
  border-radius: 5px
  height: ${props => (props.badge ? '150px' : '20rem')};
`;

const ButtonWrapper = styled.div`
  margin: 1rem;
`;

export default class Info extends Component {
  state = {
  singleLaunch: [],
  isReady: false
  }

  fetchData = () => {
  axios.get(`/api/launches/launch/${this.props.match.params.flight_number}`)
  .then(res => this.setState({
    singleLaunch: res.data,
    isReady: !this.state.isReady
  }))
  .catch(err => console.log(err));
  window.scrollTo(0,0);
  }

  componentDidMount() {
  this.fetchData();
  }

  render() {

  const {singleLaunch} = this.state;
  const {details, flight_number, mission_name, launch_date_utc} = singleLaunch;
  const date = format(launch_date_utc, "MM/DD/YYYY");
  const badge = getNestedObject(singleLaunch, ['links', 'mission_patch']);
  const rocketName = getNestedObject(singleLaunch, ['rocket', 'rocket_type']);
  const rocketType = getNestedObject(singleLaunch, ['rocket', 'rocket_name']);
  const photo = getNestedObject(singleLaunch, ['links', 'flickr_images', 2]);

  const saveLaunch = () => {
  axios.post('/api/launches/save', {
    badge,
    missionName: mission_name,
    rocketName: rocketName,
    flightNumber: flight_number,
    rocketType: rocketType,
    launchDate: date,
    photo
  })
  successNotify(mission_name);
  }

  return (
  <Layout>
  {
  this.state.isReady ?
    <Container>
    <Wrapper>
      { badge
      ? <Img badge src={badge} alt="badge" />
      : <Img badge src={noBadge} alt="badge" />
      }
      <h2>{mission_name}</h2>
      <br />
      <p>Flight number: {flight_number}</p>
      <br />
      <p>Launch Date: {date}</p>
      <br />
      <p>Rocket: {rocketName}</p>
      <br />
      <p>{details}</p>
      <br />
      { photo
      ? <Img src={photo} alt="launch" />
      : null
      }
      <ButtonWrapper>
      <Button type="primary" onClick={saveLaunch}>Save</Button>
      </ButtonWrapper>
    </Wrapper>
    </Container>
  : <Loader />
  }
  </Layout>
  )
  }
}
