import React from 'react';
import { Building } from './Building';

interface IslandSectionProps {
  className: string;
  buildingCount: number;
}

interface Position {
  top: string;
  left: string;
  transform: string;
}

export const IslandSection: React.FC<IslandSectionProps> = ({ className, buildingCount }) => {
  const getPositions = (count: number): Position[] => {
    const positions: Position[] = [];
    
    // Bina sayısına göre düzen
    const isMainIsland = count > 4;
    
    // Ana ada için
    if (isMainIsland) {
      const centerX = 50;
      const centerY = 50;
      const spacingX = 20; // Binalar arası yatay mesafe
      const spacingY = 20; // Binalar arası dikey mesafe

      // 10 bina için farklı bir düzen
      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;

        // Farklı bir şekil için x ve y hesaplamaları
        const x = centerX - 25 + col * spacingX + (row % 2 === 0 ? (col % 2 === 0 ? 0 : 10) : 5); // Alternatif kaydırma
        const y = centerY - 25 + row * spacingY - (row % 2 === 0 ? 5 : 0); // Üst satırda yukarı kaydırma

        positions.push({
          top: `${y}%`,
          left: `${x}%`,
          transform: `translate(-50%, -50%) rotate(${Math.random() * 4 - 2}deg)`
        });
      }
    } else {
      // Yan adalar için
      const points = [
        { x: 30, y: 50 }, // Sol ada
        { x: 70, y: 50 }, // Sağ ada
        { x: 30, y: 70 },
        { x: 70, y: 70 }
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

  const positions = getPositions(buildingCount);

  return (
    <div className={`absolute ${className}`}>
      {positions.map((pos, i) => (
        <Building 
          key={i} 
          className="absolute"
          style={pos}
        />
      ))}
    </div>
  );
};