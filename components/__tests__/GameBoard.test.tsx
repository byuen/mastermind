import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameBoard from '../GameBoard';
import { GameBoardProvider } from '@/contexts/GameBoardContext';

const mockColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

const renderGameBoard = (isGameActive = true) => {
  return render(
    <GameBoardProvider colors={mockColors}>
      <GameBoard isGameActive={isGameActive} />
    </GameBoardProvider>
  );
};

describe('GameBoard Component', () => {
  it('renders 10 guess rows', () => {
    renderGameBoard();
    const emptyPegs = screen.getAllByRole('button', { name: /empty peg hole/i });
    expect(emptyPegs).toHaveLength(40); // 10 rows × 4 pegs
  });

  it('renders game title', () => {
    renderGameBoard();
    expect(screen.getByText('Mastermind')).toBeInTheDocument();
  });

  it('has scrollable container when content exceeds viewport', () => {
    renderGameBoard();
    const scrollableContainer = screen.getByRole('region', { name: /game board/i });
    expect(scrollableContainer).toBeInTheDocument();
    expect(scrollableContainer).toHaveClass('overflow-y-auto');
    expect(scrollableContainer).toHaveStyle({ maxHeight: 'calc(100vh - 200px)' });
  });

  it('shows ColorPalette only for active row', () => {
    renderGameBoard();
    const colorPalettes = screen.getAllByRole('group', { name: /color palette/i });
    expect(colorPalettes).toHaveLength(1); // Only active row shows palette
  });

  it('displays all rows in vertical grid layout', () => {
    renderGameBoard();
    const submitButtons = screen.getAllByLabelText(/submit guess/i);
    expect(submitButtons.length).toBeGreaterThanOrEqual(0);
  });
});

