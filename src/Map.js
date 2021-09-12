import React from 'react';
import H from "@here/maps-api-for-javascript";
import onResize from 'simple-element-resize-detector';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    // the reference to the container
    this.ref = React.createRef();
    // reference to the map
    this.map = null;
  }


  componentDidMount() {
    if (!this.map) {
        const platform = new H.service.Platform({
            apikey: '09zTZGrWTUiCYWby6LbyMI_qAd6J-51mOBopTBZctiI'
        });
        const layers = platform.createDefaultLayers();
        const map = new H.Map(
            this.ref.current,
            layers.vector.normal.map,
            {
            pixelRatio: window.devicePixelRatio,
            center: {lat: 1.29, lng: 103.85},
            zoom: 10,
            },
        );
        onResize(this.ref.current, () => {
            map.getViewPort().resize();
        });
        this.map = map;
        // attach the listener
        map.addEventListener('mapviewchange', this.handleMapViewChange);
        // add the interactive behaviour to the map
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    }
  }

  componentDidUpdate() {
    const {
      lat,
      lng,
      zoom
    } = this.props;

    if (this.map) {
      // prevent the unnecessary map updates by debouncing the
      // setZoom and setCenter calls
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.map.setZoom(zoom);
        this.map.setCenter({lat, lng});
      }, 100);
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.removeEventListener('mapviewchange', this.handleMapViewChange);
    }
  }

  handleMapViewChange = (ev) => {
    const {
      onMapViewChange
    } = this.props;
    if (ev.newValue && ev.newValue.lookAt) {
      const lookAt = ev.newValue.lookAt;
      // adjust precision
      const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
      const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
      const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
      onMapViewChange(zoom, lat, lng);
    }
  }
  
  render() {
    return (
      <div
        style={{ position: 'relative', width: '100%', height:'500px' }}
        ref={this.ref}
      />
    )
  }  
}