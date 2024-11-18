type Position = {
  top: string;
  left: string;
  transform: string;
};

const getPositions = (count: number): Position[] => {
  const positions: Position[] = [];
  
  // Tarla sayısına göre düzen
  const isMainField = count > 4;
  
  // Ana tarla için
  if (isMainField) {
    const centerX = 50;
    const centerY = 50;
    const spacingX = 20; // Tarlalar arası yatay mesafe
    const spacingY = 20; // Tarlalar arası dikey mesafe

    // 10 tarla için 2x5 düzeni
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / 5);
      const col = i % 5;

      const x = centerX - 25 + col * spacingX; // Merkezden uzaklık
      const y = centerY - 25 + row * spacingY; // Merkezden uzaklık

      positions.push({
        top: `${y}%`,
        left: `${x}%`,
        transform: `translate(-50%, -50%) rotate(${Math.random() * 4 - 2}deg)`
      });
    }
  } else {
    // Yan adalar için
    const points = [
      { x: 40, y: 50 },
      { x: 60, y: 50 },
      { x: 40, y: 70 },
      { x: 60, y: 70 }
    ];

    points.forEach(point => {
      positions.push({
        top: `${point.y}%`,
        left: `${point.x}%`,
        transform: `translate(-50%, -50%) rotate(${Math.random() * 4 - 2}deg)`
      });
    });
  }
  
  return positions;
};

export const FieldSection = () => {
  // ... existing code ...
}; 