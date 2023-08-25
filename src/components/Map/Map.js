import React, { Component } from 'react';
import './Map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import InfoBox from '../InfoBox/InfoBox';
import CircularProgress from '@mui/material/CircularProgress';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startPosition: props.updatedStartPosition || [50.0755, 14.4378],
            markers: [],
            visible: false,
            positionId: '',
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('https://animaps-server.onrender.com')
            .then(response => response.json())
            .then(data => {
                const markers = data.map(item => {
                    const position = item.coordinates;
                    const positionLatLng = position.split(',');
                    return {
                        position: positionLatLng,
                        name: item.name,
                        id: item.id
                    };
                });
                this.setState({ markers: markers });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    handlePopupClick = (marker) => {
        this.setState({
            visible: true,
            positionId: marker.id
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filteredMarkers !== this.props.filteredMarkers) {
            this.setState({ markers: this.props.filteredMarkers }, () => {
                console.log('position got updated, first case', this.state.markers);
            });
        }
    }



    render() {
        const { markers, startPosition, isLoading } = this.state;

        return (
            <div>
                {isLoading ? (
                    <div>
                        <CircularProgress />
                        <p className='black'>Loading the map...</p>
                    </div>
                ) : (
                    <div className='container'>
                        <div className='leaflet-container'>
                            <MapContainer center={startPosition} zoom={11}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {markers.map(marker => (
                                    <Marker key={marker.id} position={marker.position}>
                                        <Popup>
                                            <div className='flex flex-column items-center'>
                                                <span className='b f6'>
                                                    {marker.name}
                                                </span>
                                                <span
                                                    className='locations blue link'
                                                    onClick={() => { this.handlePopupClick(marker); }}
                                                >
                                                    see more
                                                </span>
                                            </div>
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
                )}
            </div>
        );
    }
}

export default Map;




