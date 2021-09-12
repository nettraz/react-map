import React from 'react';
import H from "@here/maps-api-for-javascript";

export default class MapPosition extends React.Component {
    constructor(props) {
        super(props);
        // the reference to the container
        this.ref = React.createRef();
        // reference to the map
        this.service = null;
    }

    componentDidMount() {
        if (!this.service) {
            const platform = new H.service.Platform({
                apikey: '09zTZGrWTUiCYWby6LbyMI_qAd6J-51mOBopTBZctiI'
            });
            var service = platform.getSearchService();
            this.service = service;
        }
    }

    handleOnChange = (ev) => {
        const {
            onChange
        } = this.props;
        // pass the values to the parent component
        onChange(ev.target.name, ev.target.value);
    }

    handleOnClick = (ev) => {
        const {
            onChange
        } = this.props;
        this.service.autosuggest({
            // Search query
            q: this.props.addr,
            // Center of the search context
            at: this.props.lat + ',' + this.props.lng
          }, (result) => {
            let {position, title} = result.items[0];
            onChange('addr', title)
            onChange('lat', position.lat)
            onChange('lng', position.lng)
          }, alert);
    }

    render() {
        const {
        lat,
        lng,
        zoom,
        addr
        } = this.props;
        return (
        <>
            <div>
            Zoom:
            <input
                onChange={this.handleOnChange}
                name="zoom"
                type="number"
                disabled="true"
                value={zoom}
            />
            </div>
            <div>
            Latitude:
            <input
                onChange={this.handleOnChange}
                name="lat"
                type="number"
                disabled="true"
                value={lat}
            />
            </div>
            <div>
            Longitude:
            <input
                onChange={this.handleOnChange}
                name="lng"
                type="number"
                disabled="true"
                value={lng}
            />
            </div>
            <div>
            Address:
            <input
                onChange={this.handleOnChange}
                name="addr"
                type="text"
                value={addr}
            />
            </div>
            <div>
            <button
                onClick={this.handleOnClick}
                name="search">
                Search
            </button>
            </div>
        </>
        )
    }
}
