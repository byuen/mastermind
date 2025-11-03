import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedbackPegs, { FeedbackState } from '../FeedbackPegs';

describe('FeedbackPegs Component', () => {
  it('renders black pegs correctly', () => {
    const feedback: FeedbackState[] = ['black', 'black', 'empty', 'empty'];
    render(<FeedbackPegs feedback={feedback} />);
    const blackPegs = screen.getAllByLabelText('Correct color in correct position');
    expect(blackPegs).toHaveLength(2);
    blackPegs.forEach((peg) => {
      expect(peg).toHaveClass('bg-black');
    });
  });

  it('renders white pegs correctly', () => {
    const feedback: FeedbackState[] = ['white', 'white', 'empty', 'empty'];
    render(<FeedbackPegs feedback={feedback} />);
    const whitePegs = screen.getAllByLabelText('Correct color in wrong position');
    expect(whitePegs).toHaveLength(2);
    whitePegs.forEach((peg) => {
      expect(peg).toHaveClass('bg-white');
    });
  });

  it('renders empty pegs correctly', () => {
    const feedback: FeedbackState[] = ['empty', 'empty', 'empty', 'empty'];
    render(<FeedbackPegs feedback={feedback} />);
    const emptyPegs = screen.getAllByLabelText('Color not in code');
    expect(emptyPegs).toHaveLength(4);
    emptyPegs.forEach((peg) => {
      expect(peg).toHaveClass('bg-gray-100');
    });
  });

  it('renders all three feedback states together', () => {
    const feedback: FeedbackState[] = ['black', 'white', 'empty', 'empty'];
    render(<FeedbackPegs feedback={feedback} />);
    expect(screen.getByLabelText('Correct color in correct position')).toBeInTheDocument();
    expect(screen.getByLabelText('Correct color in wrong position')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Color not in code')).toHaveLength(2);
  });

  it('renders exactly 4 feedback pegs', () => {
    const feedback: FeedbackState[] = ['black', 'white', 'empty', 'empty'];
    render(<FeedbackPegs feedback={feedback} />);
    const allPegs = screen.getAllByRole('img');
    expect(allPegs).toHaveLength(4);
  });

  it('has smaller size than guess pegs (visual distinction)', () => {
    const feedback: FeedbackState[] = ['black', 'white', 'empty', 'empty'];
    render(<FeedbackPegs feedback={feedback} />);
    const pegs = screen.getAllByRole('img');
    pegs.forEach((peg) => {
      expect(peg).toHaveClass('w-4', 'h-4'); // 16px, smaller than 48px guess pegs
    });
  });
});

