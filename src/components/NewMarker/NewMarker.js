import React, { Component } from 'react';
import './NewMarker.css'
import info from './info.png';

class NewMarker extends Component {
  state = {
    coordinates: '',
    animal: '',
    name: '',
    description: '',
    uploadedImage: null,
    emptyFields: false,
    responsePost: '',
    visible: false
  };

  handleMouseToggle = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBinaryData = reader.result;
        console.log('Image Binary Data:', imageBinaryData);
        this.setState({ uploadedImage: imageBinaryData });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  handleSubmit = () => {
    const { coordinates, animal, name, description, uploadedImage } = this.state;

    if (coordinates === '' || animal === '' || name === '' || description === '') {
      this.setState({ emptyFields: true });
    } else {
      fetch('https://animaps-server.onrender.com/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coordinates,
          animal,
          name,
          description,
          uploadedImage
        })
      })
        .then(response => response.json())
        .then((data) => { this.setState({ responsePost: data }) })
        .catch(error => { this.setState({ responsePost: error }) });
    }
  }

  render() {
    const { coordinates, animal, name, description, responsePost, visible, emptyFields } = this.state;
    const { onBackToMapClick } = this.props;
    return (
      <>

        {responsePost ? (
          <div className="flex flex-column justify-center items-center vh-100">
            <p className='tc f3'>{responsePost}</p>
            <button
              className='par1 pal1 mb3 mt4 f4 b pointer'
              onClick={onBackToMapClick}> Back to Map </button>
          </div>
        ) : (
          <div className="form br3 ba b--black-10 mv4 mw7 shadow-5 center par3 pal3">
            <h2 className='f1'>Add spot</h2>
            <p>(All * fields are required)</p>
            <div className='flex flex-column'>
              <div className='flex items-center'>
                <h2 className='f3 tl ml3'>Where is it? *</h2>
                <img
                  src={info}
                  alt='Icon'
                  className='ml3 grow-large pointer'
                  style={{ width: '25px', height: '25px' }}
                  onClick={this.handleMouseToggle}
                />
                {visible ? (
                  <div className='infoBox br3 mb2 ml3 shadow-3'>
                    <p>Find the place on Google Maps and right-click it.
                      This will open a pop-up window.
                      You can find your latitude and longitude in decimal format at the top.
                      Copy and paste here.
                    </p>
                  </div>
                ) : null}
              </div>
              <input
                className='pa2 ba b--black tl ml3 mr3 br3'
                type="text"
                name="coordinates"
                value={coordinates}
                placeholder='Type in coordinates. E.g.: 50.0755, 14.4378'
                onChange={this.handleChange}
              />
            </div>
            <div className='flex flex-column'>
              <h2 className='f3 tl ml3'>What animals can you see here? *</h2>
              <input
                className='pa2 ba b--black tl ml3 mr3 br3'
                type="text"
                name="animal"
                value={animal}
                placeholder='Animal(s).'
                onChange={this.handleChange}
              />
            </div>
            <div className='flex flex-column'>
              <h2 className='f3 tl ml3'>Name *</h2>
              <input
                className='pa2 ba b--black tl ml3 mr3 br3'
                type="text"
                name="name"
                value={name}
                placeholder='Name of the spot.'
                onChange={this.handleChange}
              />
            </div>
            <div className='flex flex-column'>
              <h2 className='f3 tl ml3'>Describe the place *</h2>
              <input
                className='description pa2 ba b--black tl ml3 mr3 br3'
                type="text"
                name="description"
                value={description}
                placeholder='Tell us something about the animals, access, and others good to know.'
                onChange={this.handleChange}
              />
            </div>
            <div className='flex items-center'>
              <h2 className='f3 tl ml3'>Add a photo</h2>
              <input
                className='ml2'
                type="file"
                accept="image/*"
                onChange={this.handleImageUpload}
              />
            </div>
            {emptyFields && (
              <p className="error-message red">Please fill in all required fields.</p>
            )}
            <button
              className='par1 pal1 mb3 mt4 f4 b'
              onClick={this.handleSubmit}> Send </button>
          </div>
        )}
      </>
    );
  }
}

export default NewMarker;