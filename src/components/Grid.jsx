import React, { useEffect, useState } from 'react';

const Grid = () => {
  const cellSize = 30;

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const rows = Math.ceil(screenSize.height / cellSize);
  const cols = Math.ceil(screenSize.width / cellSize);

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    backgroundColor: '#ffffff',
    zIndex: 0,
    pointerEvents: 'none',
  };

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    boxSizing: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.03)',
  };

  return (
    <div style={containerStyle}>
      {Array.from({ length: rows }).flatMap((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <div key={`${row}-${col}`} style={cellStyle} />
        ))
      )}
    </div>
  );
};

export default Grid;
