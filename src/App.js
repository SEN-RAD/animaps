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
      searchCity: '',
      updatedStartPosition: null,
      searchAnimal: '',
      updatedMarkers: []
    }

  }

  onRouteChangeContribute = () => {
    this.setState({ route: this.routeContribute })
  }

  onRouteChangeHome = () => {
    this.setState({ route: 'home' })
  }

  onSearchInputChange = (event) => {
    const newValue = event.target.value;
    this.setState({ searchCity: newValue });
    const newValue2 = event.target.value;
    this.setState({ searchAnimal: newValue2 });
  }

  handleKeyPressSearch = (event) => {
    if (event.key === 'Enter') {
      this.combinedSearch();
    }
  };

  combinedSearch = () => {
    Promise.all([
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.searchCity}&key=4ce39d45bd0c4feabde0e9a237fc0de4`)
        .then(response => response.json()),
      fetch(`https://animaps-server.onrender.com/filtered-markers?searchAnimal=${this.state.searchAnimal}`)
        .then(response => response.json())
    ])
      .then(([cityData, animalData]) => {
        const updatedStartPosition = [cityData.results[0].geometry.lat, cityData.results[0].geometry.lng];
        const filteredMarkers = animalData.map(item => ({
          position: item.coordinates.split(','),
          name: item.name,
          id: item.id
        }));
        if (filteredMarkers.length === 0) {
          this.setState({ updatedStartPosition: updatedStartPosition });
        } else if (filteredMarkers.length > 0) {
          this.setState({ updatedMarkers: filteredMarkers });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { route, updatedStartPosition, updatedMarkers } = this.state;
    return (
      <div className="App">
        <MenuBar
          onLogoClick={this.onRouteChangeHome}
          route={route}
        />
        {route === 'home'
          ?
          <div className='content-wrapper'>
            <div className='home-content'>
              <LateralBar
                onAddSpotClick={this.onRouteChangeContribute} />
              <SearchBox
                onSearchChange={this.onSearchInputChange}
                handleKeyPress={this.handleKeyPressSearch} />
              < Map
                key={JSON.stringify(updatedStartPosition)}
                updatedStartPosition={updatedStartPosition}
                filteredMarkers={updatedMarkers} />
            </div>
          </div>
          : <div className='contribute-content'>
            < NewMarker
              onRouteChange={this.onRouteChange}
              onBackToMapClick={this.onRouteChangeHome}
            />
          </div>
        }
      </div>
    );
  }
}

export default App;
