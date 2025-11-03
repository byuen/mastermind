import React from 'react';

interface ColorPaletteProps {
  colors: string[];
  onColorSelect: (color: string) => void;
  selectedColor?: string | null;
}

export default function ColorPalette({ colors, onColorSelect, selectedColor = null }: ColorPaletteProps) {
  const handleColorClick = (color: string) => {
    onColorSelect(color);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, color: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onColorSelect(color);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center p-4" role="group" aria-label="Color palette">
      {colors.map((color, index) => {
        const isSelected = selectedColor === color;
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleColorClick(color)}
            onKeyDown={(e) => handleKeyDown(e, color)}
            className={`w-12 h-12 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSelected
                ? 'border-gray-800 ring-2 ring-gray-800 scale-110'
                : 'border-gray-400 hover:scale-105 active:scale-95'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
            aria-pressed={isSelected}
            tabIndex={0}
          >
            {isSelected && (
              <span className="text-white text-xs font-bold" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

