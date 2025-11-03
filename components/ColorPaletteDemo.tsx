import React, { useState } from 'react';
import ColorPalette from './ColorPalette';
import Peg from './Peg';

const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

export default function ColorPaletteDemo() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [pegColor, setPegColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setPegColor(color);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <ColorPalette
        colors={COLORS}
        onColorSelect={handleColorSelect}
        selectedColor={selectedColor}
      />
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-600">Selected peg:</p>
        <Peg color={pegColor} />
      </div>
    </div>
  );
}

