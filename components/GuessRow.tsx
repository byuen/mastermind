import React, { useState } from 'react';
import Peg from './Peg';
import FeedbackPegs, { FeedbackState } from './FeedbackPegs';
import ColorPalette from './ColorPalette';

interface GuessRowProps {
  rowIndex: number;
  guess: (string | null)[];
  feedback: FeedbackState[];
  onColorSelect: (rowIndex: number, pegIndex: number, color: string) => void;
  onSubmit: (rowIndex: number) => void;
  isActive: boolean;
  colors: string[];
}

export default function GuessRow({
  rowIndex,
  guess,
  feedback,
  onColorSelect,
  onSubmit,
  isActive,
  colors,
}: GuessRowProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handlePegClick = (pegIndex: number) => {
    if (isActive && selectedColor) {
      onColorSelect(rowIndex, pegIndex, selectedColor);
    }
  };

  const handleSubmit = () => {
    if (isActive && guess.every((color) => color !== null)) {
      onSubmit(rowIndex);
    }
  };

  const isComplete = guess.every((color) => color !== null);

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {guess.map((color, index) => (
            <Peg
              key={index}
              color={color}
              onClick={() => handlePegClick(index)}
              disabled={!isActive}
            />
          ))}
        </div>
        <FeedbackPegs feedback={feedback} />
        {isActive && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              isComplete
                ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label={`Submit guess for row ${rowIndex + 1}`}
          >
            Submit
          </button>
        )}
      </div>
      {isActive && (
        <ColorPalette
          colors={colors}
          onColorSelect={handleColorSelect}
          selectedColor={selectedColor}
        />
      )}
    </div>
  );
}

