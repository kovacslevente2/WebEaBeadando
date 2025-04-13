import React from 'react';
import WeatherApp from './components/WeatherApp';
import ColorCubeGame from './components/ColorCubeGame';
import './styles/App.css';

function App() {
    const [currentApp, setCurrentApp] = React.useState('weather');

    const showApp = (appName) => {
        setCurrentApp(appName);
    };

    return React.createElement('div', {className: 'container'},
        React.createElement('h1', null, 'React Alkalmazások'),
        React.createElement('div', {className: 'menu'},
            React.createElement('button', {
                onClick: () => showApp('weather')
            }, 'Időjárás'),
            React.createElement('button', {
                onClick: () => showApp('colorcube')
            }, 'Színes Kocka')
        ),
        React.createElement('div', {className: 'app-container'},
            currentApp === 'weather' ? React.createElement(WeatherApp) : React.createElement(ColorCubeGame)
        )
    );
}

export default App; 