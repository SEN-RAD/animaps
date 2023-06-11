import React from 'react';
import './MenuBar.css';

function MenuBar({ onLogoClick }) {
    return (
        <div className='menu-bar ba b--brown justify-between items-center'>
            <div className='flex items-center'>
                <img
                    className='logo ml5'
                    src={require("./logo.png")} alt="Menu Logo" />
                <h1
                    className='link f2 lh-title tl pl3 dim'
                    onClick={onLogoClick}>ANIMAPS</h1>
            </div>
        </div>
    );
}

export default MenuBar;