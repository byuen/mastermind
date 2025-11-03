import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuessRow from '../GuessRow';
import { FeedbackState } from '../FeedbackPegs';

describe('GuessRow Component', () => {
  const mockColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const mockOnColorSelect = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnColorSelect.mockClear();
    mockOnSubmit.mockClear();
  });

  it('renders 4 peg positions correctly', () => {
    const guess: (string | null)[] = [null, null, null, null];
    const feedback: FeedbackState[] = ['empty', 'empty', 'empty', 'empty'];
    render(
      <GuessRow
        rowIndex={0}
        guess={guess}
        feedback={feedback}
        onColorSelect={mockOnColorSelect}
        onSubmit={mockOnSubmit}
        isActive={true}
        colors={mockColors}
      />
    );
    const pegs = screen.getAllByRole('button', { name: /empty peg hole/i });
    expect(pegs).toHaveLength(4);
  });

  it('displays feedback pegs correctly', () => {
    const guess: (string | null)[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
    const feedback: FeedbackState[] = ['black', 'white', 'empty', 'empty'];
    render(
      <GuessRow
        rowIndex={0}
        guess={guess}
        feedback={feedback}
        onColorSelect={mockOnColorSelect}
        onSubmit={mockOnSubmit}
        isActive={false}
        colors={mockColors}
      />
    );
    expect(screen.getByLabelText('Correct color in correct position')).toBeInTheDocument();
    expect(screen.getByLabelText('Correct color in wrong position')).toBeInTheDocument();
  });

  it('shows submit button when row is active', () => {
    const guess: (string | null)[] = [null, null, null, null];
    const feedback: FeedbackState[] = ['empty', 'empty', 'empty', 'empty'];
    render(
      <GuessRow
        rowIndex={0}
        guess={guess}
        feedback={feedback}
        onColorSelect={mockOnColorSelect}
        onSubmit={mockOnSubmit}
        isActive={true}
        colors={mockColors}
      />
    );
    expect(screen.getByLabelText(/submit guess/i)).toBeInTheDocument();
  });

  it('enables submit button when all pegs are filled', () => {
    const guess: (string | null)[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
    const feedback: FeedbackState[] = ['empty', 'empty', 'empty', 'empty'];
    render(
      <GuessRow
        rowIndex={0}
        guess={guess}
        feedback={feedback}
        onColorSelect={mockOnColorSelect}
        onSubmit={mockOnSubmit}
        isActive={true}
        colors={mockColors}
      />
    );
    const submitButton = screen.getByLabelText(/submit guess/i);
    expect(submitButton).not.toHaveClass('cursor-not-allowed');
  });

  it('calls onSubmit when submit button is clicked and row is complete', () => {
    const guess: (string | null)[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
    const feedback: FeedbackState[] = ['empty', 'empty', 'empty', 'empty'];
    render(
      <GuessRow
        rowIndex={0}
        guess={guess}
        feedback={feedback}
        onColorSelect={mockOnColorSelect}
        onSubmit={mockOnSubmit}
        isActive={true}
        colors={mockColors}
      />
    );
    const submitButton = screen.getByLabelText(/submit guess/i);
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith(0);
  });

  it('populates peg when color is selected and peg is clicked', () => {
    const guess: (string | null)[] = [null, null, null, null];
    const feedback: FeedbackState[] = ['empty', 'empty', 'empty', 'empty'];
    render(
      <GuessRow
        rowIndex={0}
        guess={guess}
        feedback={feedback}
        onColorSelect={mockOnColorSelect}
        onSubmit={mockOnSubmit}
        isActive={true}
        colors={mockColors}
      />
    );
    const colorButton = screen.getByLabelText(`Select color ${mockColors[0]}`);
    fireEvent.click(colorButton);
    const firstPeg = screen.getAllByRole('button', { name: /empty peg hole/i })[0];
    fireEvent.click(firstPeg);
    expect(mockOnColorSelect).toHaveBeenCalledWith(0, 0, mockColors[0]);
  });
});

