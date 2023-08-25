import React from 'react';
import './MenuBar.css';

function MenuBar({ onLogoClick, route }) {
    return (
        <div className='menu-bar ba b--brown justify-between items-center'>
            <div className='flex items-center'>
                <img
                    className='logo ml5'
                    src={require("./logo.png")} alt="Menu Logo" />
                <h1
                    className='f2 lh-title tl pl3 grow pointer'
                    onClick={onLogoClick}>ANIMAPS</h1>
            </div>
            {route === 'contribute'
                ?
                <div
                    className='flex items-center grow-large pointer'
                    style={{ marginRight: '80px' }}
                >
                    <img
                        className='home'
                        src={require("./home.png")} alt="Home Logo"
                        onClick={onLogoClick}
                    />
                </div>
                : null}
        </div>
    );
}

export default MenuBar;