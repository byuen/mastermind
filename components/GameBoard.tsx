'use client';

import React from 'react';
import GuessRow from './GuessRow';
import { useGameBoard } from '@/contexts/GameBoardContext';

interface GameBoardProps {
  isGameActive?: boolean;
}

export default function GameBoard({ isGameActive = true }: GameBoardProps) {
  const { guesses, feedbacks, activeRowIndex, colors, gameStatus, secretCode, updateGuess, submitGuess, resetGame } = useGameBoard();

  return (
    <main className="flex flex-col w-full max-w-2xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Mastermind</h1>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium"
          aria-label="Reset game"
        >
          New Game
        </button>
      </div>

      {gameStatus === 'won' && (
        <div className="mb-4 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-center">
          <p className="text-xl font-bold text-green-800 mb-2">🎉 Congratulations! You won!</p>
          <p className="text-sm text-green-700">You solved the code in {activeRowIndex + 1} attempt{activeRowIndex + 1 !== 1 ? 's' : ''}!</p>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg text-center">
          <p className="text-xl font-bold text-red-800 mb-2">Game Over</p>
          <p className="text-sm text-red-700">The secret code was: {secretCode?.map((color, i) => (
            <span
              key={i}
              className="inline-block w-6 h-6 rounded-full border-2 border-gray-600 ml-1"
              style={{ backgroundColor: color }}
              aria-label={`Secret code color ${i + 1}`}
            />
          ))}</p>
          <p className="text-sm text-red-700 mt-2">Try again!</p>
        </div>
      )}

      <div
        className="overflow-y-auto border border-gray-300 rounded-lg p-2 sm:p-4"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
        role="region"
        aria-label="Game board with 10 guess rows"
      >
        {guesses.map((guess, rowIndex) => (
          <GuessRow
            key={rowIndex}
            rowIndex={rowIndex}
            guess={guess}
            feedback={feedbacks[rowIndex]}
            onColorSelect={updateGuess}
            onSubmit={submitGuess}
            isActive={isGameActive && gameStatus === 'active' && rowIndex === activeRowIndex}
            colors={colors}
          />
        ))}
      </div>
    </main>
  );
}

