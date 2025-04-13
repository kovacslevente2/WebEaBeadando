function WeatherApp() {
    const [city, setCity] = React.useState('');
    const [weather, setWeather] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSearch = async () => {
        if (!city) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=46.91&longitude=19.69&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`);
            if (!response.ok) {
                throw new Error('Város nem található vagy hiba történt a lekérdezés során');
            }
            const data = await response.json();
            
         
            const weatherData = {
                name: city,
                main: {
                    temp: data.current.temperature_2m,
                    humidity: data.current.relative_humidity_2m
                },
                wind: {
                    speed: data.current.wind_speed_10m
                },
                weather: [{
                    description: getWeatherDescription(data.current.weather_code)
                }]
            };
            
            setWeather(weatherData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

   
    function getWeatherDescription(code) {
        const descriptions = {
            0: 'Tiszta ég',
            1: 'Főként tiszta',
            2: 'Részben felhős',
            3: 'Felhős',
            45: 'Ködös',
            48: 'Dús köd',
            51: 'Könnyű szitálás',
            53: 'Mérsékelt szitálás',
            55: 'Erős szitálás',
            61: 'Könnyű eső',
            63: 'Mérsékelt eső',
            65: 'Erős eső',
            71: 'Könnyű hó',
            73: 'Mérsékelt hó',
            75: 'Erős hó',
            77: 'Hószemek',
            80: 'Könnyű zápor',
            81: 'Mérsékelt zápor',
            82: 'Erős zápor',
            85: 'Könnyű hózápor',
            86: 'Erős hózápor',
            95: 'Vihar',
            96: 'Vihar jégesővel',
            99: 'Erős vihar jégesővel'
        };
        return descriptions[code] || 'Ismeretlen időjárás';
    }

    return React.createElement('div', {className: 'weather-container'},
        React.createElement('div', null,
            React.createElement('input', {
                type: 'text',
                className: 'city-input',
                value: city,
                onChange: (e) => setCity(e.target.value),
                placeholder: 'Város neve',
                onKeyPress: (e) => e.key === 'Enter' && handleSearch()
            }),
            React.createElement('button', {
                className: 'search-button',
                onClick: handleSearch
            }, 'Keresés')
        ),
        loading && React.createElement('div', {className: 'loading'}, 'Betöltés...'),
        error && React.createElement('div', {className: 'error'}, error),
        weather && React.createElement('div', {className: 'weather-info'},
            React.createElement('h2', null, weather.name),
            React.createElement('div', {className: 'weather-item'},
                React.createElement('span', null, 'Hőmérséklet:'),
                React.createElement('span', null, `${Math.round(weather.main.temp)}°C`)
            ),
            React.createElement('div', {className: 'weather-item'},
                React.createElement('span', null, 'Páratartalom:'),
                React.createElement('span', null, `${weather.main.humidity}%`)
            ),
            React.createElement('div', {className: 'weather-item'},
                React.createElement('span', null, 'Szélsebesség:'),
                React.createElement('span', null, `${weather.wind.speed} km/h`)
            ),
            React.createElement('div', {className: 'weather-item'},
                React.createElement('span', null, 'Időjárás:'),
                React.createElement('span', null, weather.weather[0].description)
            )
        )
    );
}

window.WeatherApp = WeatherApp; 