import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import {Loader} from '../utils/loader';
import Layout from '../Layout';
import SavedSingle from './SavedSingle';
import { Container } from '../Shared/launch.style';
import Button from '../Layout/Button';

const Empty = styled.h2`
  margin: 5rem auto;
`;

const RemoveButton = styled.div`
  margin: 1.5rem auto;
  width: 50%;
  display: flex;
  justify-content: center;
`;


class SavedContainer extends Component {
  state = {
    savedLaunches: [],
    isReady: false,
  }

  componentDidMount = () => {
    this.fetchSaved();
  }

  fetchSaved = () => {
    axios.get('/api/launches/getsaved')
    .then(response => {
      this.setState({
        savedLaunches: response.data,
        isReady: !this.state.isReady
      });
    })
  }

  deleteLaunch = (id) => {
    axios.delete(`/api/launches/delete`)
      .then(window.location.reload(true))
  }

  render(){
    const {savedLaunches} = this.state
    return(
      <Layout>
        <RemoveButton>
          <Button type="remove" onClick={this.deleteLaunch}>Remove All</Button>
        </RemoveButton>
        {
          this.state.isReady ?
            <Container>
              {savedLaunches.length > 0 ?
                savedLaunches.map((launch, i) => (
                  <SavedSingle
                  key={i}
                  launch={launch}
                  />
                ))
                :
              <Empty>No launches saved.</Empty>
              }
          </Container>
          :
          <Loader />
        }
      </Layout>
    );
  }
}

export default SavedContainer;