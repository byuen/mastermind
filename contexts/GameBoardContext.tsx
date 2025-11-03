'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FeedbackState } from '@/components/FeedbackPegs';
import {
  generateSecretCode,
  validateGuess,
  calculateFeedback,
  checkWin,
  checkLoss,
} from '@/lib/gameLogic';

export type GameStatus = 'active' | 'won' | 'lost';

interface GameBoardContextType {
  guesses: (string | null)[][];
  feedbacks: FeedbackState[][];
  activeRowIndex: number;
  colors: string[];
  gameStatus: GameStatus;
  secretCode: string[] | null;
  updateGuess: (rowIndex: number, pegIndex: number, color: string) => void;
  submitGuess: (rowIndex: number) => void;
  resetGame: () => void;
}

const GameBoardContext = createContext<GameBoardContextType | undefined>(undefined);

export function GameBoardProvider({ children, colors }: { children: ReactNode; colors: string[] }) {
  const [guesses, setGuesses] = useState<(string | null)[][]>(
    Array(10).fill(null).map(() => Array(4).fill(null))
  );
  const [feedbacks, setFeedbacks] = useState<FeedbackState[][]>(
    Array(10).fill(null).map(() => Array(4).fill('empty'))
  );
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('active');
  const [secretCode, setSecretCode] = useState<string[] | null>(null);

  // Generate secret code when component mounts or game resets
  useEffect(() => {
    if (secretCode === null) {
      const code = generateSecretCode(colors, 4);
      setSecretCode(code);
      // Secret code generated - removed console.log for production
    }
  }, [colors, secretCode]);

  const updateGuess = (rowIndex: number, pegIndex: number, color: string) => {
    if (rowIndex === activeRowIndex && gameStatus === 'active') {
      setGuesses((prev) => {
        const newGuesses = [...prev];
        newGuesses[rowIndex] = [...newGuesses[rowIndex]];
        newGuesses[rowIndex][pegIndex] = color;
        return newGuesses;
      });
    }
  };

  const submitGuess = (rowIndex: number) => {
    if (
      rowIndex === activeRowIndex &&
      gameStatus === 'active' &&
      secretCode !== null &&
      validateGuess(guesses[rowIndex], 4)
    ) {
      const guess = guesses[rowIndex] as string[];
      const feedback = calculateFeedback(guess, secretCode);

      // Update feedback for this row
      setFeedbacks((prev) => {
        const newFeedbacks = [...prev];
        newFeedbacks[rowIndex] = feedback;
        return newFeedbacks;
      });

      // Check for win
      if (checkWin(feedback)) {
        setGameStatus('won');
      } else if (checkLoss(activeRowIndex + 1, 10)) {
        // Check for loss (after this attempt, we've used all 10 rows)
        setGameStatus('lost');
      } else {
        // Move to next row
        setActiveRowIndex((prev) => Math.min(prev + 1, 9));
      }
    }
  };

  const resetGame = () => {
    setGuesses(Array(10).fill(null).map(() => Array(4).fill(null)));
    setFeedbacks(Array(10).fill(null).map(() => Array(4).fill('empty')));
    setActiveRowIndex(0);
    setGameStatus('active');
    setSecretCode(null); // This will trigger useEffect to generate new code
  };

  return (
    <GameBoardContext.Provider
      value={{
        guesses,
        feedbacks,
        activeRowIndex,
        colors,
        gameStatus,
        secretCode,
        updateGuess,
        submitGuess,
        resetGame,
      }}
    >
      {children}
    </GameBoardContext.Provider>
  );
}

export function useGameBoard() {
  const context = useContext(GameBoardContext);
  if (context === undefined) {
    throw new Error('useGameBoard must be used within a GameBoardProvider');
  }
  return context;
}

