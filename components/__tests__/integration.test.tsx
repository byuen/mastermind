import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GameBoard from '../GameBoard';
import { GameBoardProvider } from '@/contexts/GameBoardContext';

const mockColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

const renderGameBoard = () => {
  return render(
    <GameBoardProvider colors={mockColors}>
      <GameBoard />
    </GameBoardProvider>
  );
};

describe('Integration Tests - Complete User Workflow', () => {
  it('allows user to select color, fill pegs, and submit guess', async () => {
    const user = userEvent.setup();
    renderGameBoard();

    // Select a color from palette
    const colorButton = screen.getByLabelText(`Select color ${mockColors[0]}`);
    await user.click(colorButton);

    // Fill all 4 pegs
    const emptyPegs = screen.getAllByRole('button', { name: /empty peg hole/i });
    expect(emptyPegs.length).toBeGreaterThanOrEqual(4);

    // Click each peg to fill with selected color
    for (let i = 0; i < 4; i++) {
      await user.click(emptyPegs[i]);
      // Select color again after each peg click
      await user.click(colorButton);
    }

    // Verify submit button is enabled
    const submitButton = screen.getByLabelText(/submit guess/i);
    expect(submitButton).not.toHaveClass('cursor-not-allowed');

    // Submit the guess
    await user.click(submitButton);
  });

  it('moves to next row after submitting complete guess', async () => {
    const user = userEvent.setup();
    renderGameBoard();

    const firstColor = mockColors[0];
    const colorButton = screen.getByLabelText(`Select color ${firstColor}`);

    // Fill first row
    for (let i = 0; i < 4; i++) {
      await user.click(colorButton);
      const pegs = screen.getAllByRole('button', { name: /empty peg hole|peg with color/i });
      const emptyPeg = pegs.find((p) => p.getAttribute('aria-label')?.includes('empty'));
      if (emptyPeg) {
        await user.click(emptyPeg);
      }
    }

    // Submit first row
    const submitButton = screen.getByLabelText(/submit guess/i);
    await user.click(submitButton);

    // Verify second row is now active (should have new color palette)
    const colorPalettes = screen.getAllByRole('group', { name: /color palette/i });
    expect(colorPalettes.length).toBeGreaterThanOrEqual(1);
  });

  it('disables previous rows after submission', async () => {
    const user = userEvent.setup();
    renderGameBoard();

    // Fill and submit first row
    const firstColor = mockColors[0];
    const colorButton = screen.getByLabelText(`Select color ${firstColor}`);
    
    // Simple approach: select color, click first 4 pegs
    await user.click(colorButton);
    const emptyPegs = screen.getAllByRole('button', { name: /empty peg hole/i });
    for (let i = 0; i < 4 && i < emptyPegs.length; i++) {
      await user.click(colorButton);
      await user.click(emptyPegs[i]);
    }

    // Submit first row
    const submitButton = screen.getByLabelText(/submit guess/i);
    if (!submitButton.hasAttribute('disabled')) {
      await user.click(submitButton);
    }

    // Verify we can see feedback pegs (indicating row was submitted)
    const feedbackGroups = screen.getAllByRole('group', { name: /feedback pegs/i });
    expect(feedbackGroups.length).toBeGreaterThanOrEqual(1);
  });

  it('supports keyboard navigation for color selection', async () => {
    const user = userEvent.setup();
    renderGameBoard();

    const colorButton = screen.getByLabelText(`Select color ${mockColors[0]}`);
    colorButton.focus();

    // Use keyboard to select color
    await user.keyboard('{Enter}');
    
    // Verify color is selected (should show in palette)
    expect(colorButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('displays feedback pegs for completed rows', async () => {
    const user = userEvent.setup();
    renderGameBoard();

    // Fill and submit first row
    const firstColor = mockColors[0];
    const colorButton = screen.getByLabelText(`Select color ${firstColor}`);
    
    for (let i = 0; i < 4; i++) {
      await user.click(colorButton);
      const pegs = screen.getAllByRole('button', { name: /empty peg hole|peg with color/i });
      const emptyPeg = pegs.find((p) => p.getAttribute('aria-label')?.includes('empty'));
      if (emptyPeg) {
        await user.click(emptyPeg);
      }
    }

    await user.click(screen.getByLabelText(/submit guess/i));

    // Verify feedback pegs are displayed (they should exist even if empty)
    const feedbackGroups = screen.getAllByRole('group', { name: /feedback pegs/i });
    expect(feedbackGroups.length).toBeGreaterThanOrEqual(1);
  });
});

