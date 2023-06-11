import React, { Component } from 'react';

class SearchBox extends Component {
    render() {
        const { onSearchChange, handleKeyPress } = this.props;
        return (
            <div className='pa4 flex items-center justify-center'>
                <input
                    className='pa3 ba b--brown w-25 br2'
                    type='search'
                    placeholder='search for cities'
                    onChange={onSearchChange}
                    onKeyDown={handleKeyPress}
                />
                <p className='ml3'>or explore the map</p>
            </div>
        );
    }
}

export default SearchBox;