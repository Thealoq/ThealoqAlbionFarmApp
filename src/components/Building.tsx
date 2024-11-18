import React from 'react';

interface BuildingProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Building: React.FC<BuildingProps> = ({ className = "", style = {} }) => (
  <div 
    className={`w-6 h-6 bg-[#8B4513] rounded-sm shadow-lg 
    before:content-[''] before:absolute before:top-0 before:left-1/2 
    before:w-3 before:h-2 before:bg-[#654321] before:-translate-x-1/2 before:-translate-y-1
    before:transform before:rotate-45 ${className}`}
    style={style}
  />
);