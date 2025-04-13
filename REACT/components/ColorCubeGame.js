function ColorCubeGame() {
    const [score, setScore] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState(30);
    const [gameOver, setGameOver] = React.useState(false);
    const [colors, setColors] = React.useState(Array(9).fill().map(() => getRandomColor()));

    function getRandomColor() {
        const colors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00']; 
        return colors[Math.floor(Math.random() * colors.length)];
    }

    React.useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const handleClick = (index) => {
        if (gameOver) return;

        const newColors = [...colors];
        const clickedColor = newColors[index];
        
      
        const neighbors = [
            index - 3, 
            index + 3, 
            index % 3 !== 0 ? index - 1 : -1, 
            index % 3 !== 2 ? index + 1 : -1  
        ];

        neighbors.forEach(neighbor => {
            if (neighbor >= 0 && neighbor < 9) {
                newColors[neighbor] = clickedColor;
            }
        });

        setColors(newColors);
        setScore(prev => prev + 1);

      
        if (newColors.every(color => color === clickedColor)) {
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameOver(false);
        setColors(Array(9).fill().map(() => getRandomColor()));
    };

    return React.createElement('div', {className: 'game-container'},
        React.createElement('div', {className: 'game-info'},
            React.createElement('div', {className: 'score'}, `Pontszám: ${score}`),
            React.createElement('div', {className: 'timer'}, `Hátralévő idő: ${timeLeft} másodperc`)
        ),
        React.createElement('div', {className: 'game-board'},
            colors.map((color, index) => 
                React.createElement('div', {
                    key: index,
                    className: 'cube',
                    style: { backgroundColor: color },
                    onClick: () => handleClick(index)
                })
            )
        ),
        gameOver && React.createElement('button', {
            className: 'reset-button',
            onClick: resetGame
        }, 'Új játék')
    );
}

window.ColorCubeGame = ColorCubeGame; 