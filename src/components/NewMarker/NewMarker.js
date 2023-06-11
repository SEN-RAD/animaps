import React, { Component } from 'react';
import './NewMarker.css'


class NewMarker extends Component {
  state = {
    coordinates: '',
    animal: '',
    name: '',
    description: '',
    responsePost: '',
    uploadedImage: null
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

    fetch('https://animaps-server-production.up.railway.app/contribute', {
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

  }

  render() {
    const { coordinates, animal, name, description, responsePost } = this.state;
    return (
      < >
        <div className="form br3 ba b--black-10 mv4 mw7 shadow-5 center par3 pal3">
          <h2 className='f2'>Add spot</h2>
          <div className='flex flex-column'>
            <h2 className='f3 tl ml3'>Where is it?</h2>
            <input
              className='pa2 ba b--black tl ml3 mr3 br3'
              type="text"
              name="coordinates"
              value={coordinates}
              placeholder='Type in coordinates in format lat, lng. E.g.: 50.0755, 14.4378'
              onChange={this.handleChange}
            />
          </div>
          <div className='flex flex-column'>
            <h2 className='f3 tl ml3'>What animals can you see here?</h2>
            <input
              className='pa2 ba b--black tl ml3 mr3 br3'
              type="text"
              name="animal"
              value={animal}
              placeholder='Animal(s) or "farm", "zoo", "park" if appropriate.'
              onChange={this.handleChange}
            />
          </div>
          <div className='flex flex-column'>
            <h2 className='f3 tl ml3'>Name</h2>
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
            <h2 className='f3 tl ml3'>Describe the place</h2>
            <input
              className='description pa2 ba b--black tl ml3 mr3 br3'
              type="text"
              name="description"
              value={description}
              placeholder='Please describe the spot briefly. Tell us something about the animals, access, and others good to know.'
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
          <button
            className='par1 pal1 mb3 mt4 f4 b'
            onClick={this.handleSubmit}> Send </button>
        </div>
        <p> {responsePost}</p>
      </>
    );
  }
}

export default NewMarker;