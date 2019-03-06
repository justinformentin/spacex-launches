import React from 'react';
import axios from 'axios';
import Layout from '../Layout';
import { Loader } from '../utils/loader';
import LaunchSingle from './LaunchSingle'
import { Container } from '../Shared/launch.style';

class Launches extends React.Component{
  state = {
    launches: [],
    isReady: false,
  }

  componentDidMount() {
    axios.get('/api/launches')
    .then(response => {
      this.setState({
        launches: response.data.data,
        isReady: !this.state.isReady
      });
    })
  }

  render(){
    const {launches} = this.state
    return(
      <Layout>
        {
          this.state.isReady ?
            <Container>
              {launches.map((launch, i) => (
                <LaunchSingle
                key={i}
                launch={launch}
                />
              ))}
            </Container>
          :
          <Loader />
        }
      </Layout>
    );
  }
}

export default Launches;
