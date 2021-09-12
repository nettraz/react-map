import React from 'react';
import Map from './Map';
import MapPosition from './MapPosition';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 0,
      lat: 0,
      lng: 0,
      addr: '',
      results: []
    }
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleMapViewChange = (zoom, lat, lng, addr, results) => {
    this.setState({
      lat,
      lng,
      zoom,
      addr,
      results
    })
  }

  render() {
    const {
      zoom,
      lat,
      lng,
      addr
    } = this.state;
    return (
      <div className="App">
        <Map
          lat={lat}
          lng={lng}
          onMapViewChange={this.handleMapViewChange}
          zoom={zoom}
        />
        <MapPosition
          lat={lat}
          lng={lng}
          onChange={this.handleInputChange}
          zoom={zoom}
          addr={addr}
        />
      </div>
    );
  }
}
