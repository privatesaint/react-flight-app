import React, { Component } from 'react';
import Loading from './Loading';
import { APP_URL } from '../config';
import { handleResponse } from '../helpers';
import Card from './Card';
import Layout from './Layout';
import { AuthContext } from '../Context';
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
  static contextType = AuthContext;
  constructor() {
    super();
    this.state = {
      regions: [],
      time: 0,
      loading: true,
      error: ''
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    fetch(
      `${APP_URL}/airports/region?lamin=46.619261036171515&lamax=54.25238930276849&lomin=-12.194824218750002&lomax=5.844726562500001&type=large_airport`
    )
      .then(handleResponse)
      .then(resp =>
        this.setState({ regions: resp.slice(4, 14), loading: false })
      )
      .catch(error => this.setState({ error, loading: false }));
  }

  renderHelper() {
    const { regions, loading, error } = this.state;
    console.log(regions);
    if (loading) {
      return (
        <div className='container'>
          <div className='load-cont'>
            <Loading />
          </div>
        </div>
      );
    }
    if (error) {
      return (
        <div className='container'>
          <div className='error'>{error.error}</div>
        </div>
      );
    }
    return (
      <section className='container'>
        <h1>10 major cities with heavy air traffic</h1>
        <div className='card-container'>
          {regions.map(region => (
            <Card region={region} key={region.icao} />
          ))}
        </div>
      </section>
    );
  }

  render() {
    return <Layout>{this.renderHelper()}</Layout>;
  }
}
