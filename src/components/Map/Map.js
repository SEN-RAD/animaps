import React, { Component } from 'react';
import './Map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import InfoBox from '../InfoBox/InfoBox';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startPosition: props.updatedStartPosition || [50.0755, 14.4378],
            items: [],
            markers: [],
            visible: false,
            positionId: ''
        };
    }

    componentDidMount() {
        fetch('https://animaps-server-production.up.railway.app')
            .then(response => response.json())
            .then(data => {
                const markers = data.map(item => {
                    const position = item.coordinates;
                    const positionLatLng = position.split(',');
                    return {
                        position: positionLatLng,
                        name: item.animal,
                        id: item.id
                    };
                });
                this.setState({
                    items: data,
                    markers: markers,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handlePopupClick = (marker) => {
        this.setState({
            visible: true,
            positionId: marker.id
        });
        console.log("here", this.state.positionId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.updatedStartPosition !== this.props.updatedStartPosition) {
            this.setState({ startPosition: this.props.updatedStartPosition });
        }
    }

    render() {
        const { markers, startPosition } = this.state;
        return (
            <div className='container'>
                <div className='leaflet-container'>
                    <MapContainer center={startPosition} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markers.map(marker => (
                            <Marker key={marker.id} position={marker.position}>
                                <Popup>
                                    Here you can see: <br />
                                    <span
                                        className='locations'
                                        onClick={() => { this.handlePopupClick(marker); }}>
                                        {marker.name}
                                    </span>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
                <div className='info'>
                    {this.state.visible && (
                        <div>
                            {this.state.positionId && <InfoBox key={this.state.positionId} markerId={this.state.positionId} />}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Map;




