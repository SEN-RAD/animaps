import React, { Component } from 'react';
import './InfoBox.css';

class InfoBox extends Component {

    constructor(props) {
        super(props);
        this.markerId = props.markerId;
        this.state = {
            visible: false,
            description: ''
        }
        this.fetchDescription = this.fetchDescription.bind(this);
    }

    fetchDescription = () => {
        fetch(`https://animaps-server.onrender.com/markers/${this.props.markerId}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ description: data[0].description });
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
        if (!this.state.description) {
            return <div>Loading...</div>;
        }
        return (
            <div className={`info ${this.state.animate ? 'animate' : ''}`}>
                <p className='paragraph'> {this.state.description}</p>
                <img className='image'
                    src={require('./squirrel.jpg')} alt='ground squirrel'></img>
            </div>
        );
    }
}

export default InfoBox;

