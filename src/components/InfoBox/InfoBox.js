import React, { Component } from 'react';
import './InfoBox.css';
import CircularProgress from '@mui/material/CircularProgress';

class InfoBox extends Component {

    constructor(props) {
        super(props);
        this.markerId = props.markerId;
        this.state = {
            visible: false,
            name: '',
            animal: '',
            description: ''
        }
        this.fetchDescription = this.fetchDescription.bind(this);
    }

    fetchDescription = () => {
        fetch(`https://animaps-server.onrender.com/markers/${this.props.markerId}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    name: data[0].name,
                    animal: data[0].animal,
                    description: data[0].description
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchDescription();
    };

    componentDidUpdate(prevProps) {
        if (this.props.markerId !== prevProps.markerId) {
            this.fetchDescription();
        };
    }

    render() {
        const { animate, animal, name, description } = this.state;
        if (!this.state.description) {
            return <div> <CircularProgress /> <p className='black'>Loading info...</p> </div>
        }
        return (
            <div className={`info ${animate ? 'animate' : ''}`}>
                <div className='paragraph'>
                    <h3>{name}</h3>
                    <p>Here you can see {animal}. </p>
                    <p>{description}</p>
                </div>
                <img className='image'
                    src={require('./noimage.jpg')} alt='no image available'></img>
            </div>
        );
    }
}

export default InfoBox;

