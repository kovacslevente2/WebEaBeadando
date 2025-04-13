// Fő alkalmazás komponens
function App() {
    const [activeMenu, setActiveMenu] = React.useState('color-cube');

    return (
        <div>
            <div className="menu">
                <button onClick={() => setActiveMenu('color-cube')}>Színes Kocka</button>
                <button onClick={() => setActiveMenu('weather')}>Időjárás</button>
            </div>
            {activeMenu === 'color-cube' ? <ColorCubeGame /> : <WeatherInfo />}
        </div>
    );
}

// Színes Kocka játék komponens
function ColorCubeGame() {
    const [score, setScore] = React.useState(0);
    const [cubes, setCubes] = React.useState(generateCubes());
    const [targetColor, setTargetColor] = React.useState(getRandomColor());

    function generateCubes() {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000'];
        return Array(9).fill(null).map(() => ({
            color: colors[Math.floor(Math.random() * colors.length)],
            id: Math.random()
        }));
    }

    function getRandomColor() {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const handleCubeClick = (cubeColor) => {
        if (cubeColor === targetColor) {
            setScore(score + 1);
            setCubes(generateCubes());
            setTargetColor(getRandomColor());
        } else {
            setScore(Math.max(0, score - 1));
        }
    };

    return (
        <div>
            <div className="score">
                Pontszám: {score}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                Kattints a {targetColor} színű kockára!
            </div>
            <div className="color-cube">
                {cubes.map((cube, index) => (
                    <div
                        key={cube.id}
                        className="cube"
                        style={{ backgroundColor: cube.color }}
                        onClick={() => handleCubeClick(cube.color)}
                    />
                ))}
            </div>
        </div>
    );
}

// Időjárás Információ komponens
function WeatherInfo() {
    const [city, setCity] = React.useState('');
    const [weather, setWeather] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const fetchWeather = async () => {
        if (!city) return;
        
        setLoading(true);
        try {
            // Mivel nincs valódi API kulcs, szimuláljuk az időjárás adatokat
            const mockWeather = {
                temperature: Math.floor(Math.random() * 30) - 5,
                humidity: Math.floor(Math.random() * 100),
                windSpeed: Math.floor(Math.random() * 30),
                description: ['Napos', 'Felhős', 'Esős', 'Havas'][Math.floor(Math.random() * 4)]
            };
            
            setTimeout(() => {
                setWeather(mockWeather);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Hiba az időjárás adatok lekérdezésekor:', error);
            setLoading(false);
        }
    };

    return (
        <div className="weather-container">
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    className="city-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Város neve"
                />
                <button className="search-button" onClick={fetchWeather}>
                    Keresés
                </button>
            </div>
            
            {loading ? (
                <div>Betöltés...</div>
            ) : weather ? (
                <div className="weather-info">
                    <div className="weather-item">
                        <span>Hőmérséklet:</span>
                        <span>{weather.temperature}°C</span>
                    </div>
                    <div className="weather-item">
                        <span>Páratartalom:</span>
                        <span>{weather.humidity}%</span>
                    </div>
                    <div className="weather-item">
                        <span>Szélsebesség:</span>
                        <span>{weather.windSpeed} km/h</span>
                    </div>
                    <div className="weather-item">
                        <span>Leírás:</span>
                        <span>{weather.description}</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

// React alkalmazás renderelése
ReactDOM.render(<App />, document.getElementById('root')); 