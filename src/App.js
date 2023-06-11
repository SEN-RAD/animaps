import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map';
import NewMarker from './components/NewMarker/NewMarker';
import SearchBox from './components/SearchBox/SearchBox';
import MenuBar from './components/MenuBar/MenuBar';
import LateralBar from './components/LateralBar/LateralBar';

class App extends Component {

  routeContribute = "contribute"

  constructor() {
    super()
    this.state = {
      route: 'home',
      searchLocation: '',
      updatedStartPosition: null
    }
    this.fetchLocation = this.fetchLocation.bind(this);
  }

  onRouteChangeContribute = () => {
    this.setState({ route: this.routeContribute })
  }

  onRouteChangeHome = () => {
    this.setState({ route: 'home' })
  }

  onSearchChange = (event) => {
    this.setState({ searchLocation: event.target.value });
  }

  handleKeyPressSearch = (event) => {
    if (event.key === 'Enter') {
      this.fetchLocation();
    }
  };

  fetchLocation = () => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.searchLocation}&key=4ce39d45bd0c4feabde0e9a237fc0de4`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          updatedStartPosition:
            [data.results[0].geometry.lat, data.results[0].geometry.lng]
        });
      });
  }

  render() {
    const { updatedStartPosition } = this.state;
    return (
      <div className="App">
        <MenuBar
          onLogoClick={this.onRouteChangeHome} />
        {this.state.route === 'home'
          ?
          <div className='content-wrapper'>
            <div className='home-content'>
              <LateralBar
                onAddSpotClick={this.onRouteChangeContribute} />
              <SearchBox
                onSearchChange={this.onSearchChange}
                handleKeyPress={this.handleKeyPressSearch} />
              < Map
                key={JSON.stringify(updatedStartPosition)}
                updatedStartPosition={updatedStartPosition} />
            </div>
          </div>
          : <div className='contribute-content'>
            < NewMarker onRouteChange={this.onRouteChange} />
          </div>

        }

      </div>
    );
  }
}

export default App;
