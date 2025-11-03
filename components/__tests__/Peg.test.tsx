import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Peg from '../Peg';

describe('Peg Component', () => {
  it('renders empty peg hole when color is null', () => {
    render(<Peg color={null} />);
    const peg = screen.getByRole('button', { name: /empty peg hole/i });
    expect(peg).toBeInTheDocument();
    expect(peg).toHaveClass('bg-gray-100');
  });

  it('displays colored peg when color is provided', () => {
    render(<Peg color="#FF0000" />);
    const peg = screen.getByRole('button', { name: /peg with color #FF0000/i });
    expect(peg).toBeInTheDocument();
    expect(peg).toHaveStyle({ backgroundColor: '#FF0000' });
  });

  it('calls onClick handler when clicked and not disabled', () => {
    const handleClick = jest.fn();
    render(<Peg color={null} onClick={handleClick} />);
    const peg = screen.getByRole('button');
    fireEvent.click(peg);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Peg color={null} onClick={handleClick} disabled={true} />);
    const peg = screen.getByRole('button');
    fireEvent.click(peg);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled styling when disabled prop is true', () => {
    render(<Peg color="#FF0000" disabled={true} />);
    const peg = screen.getByRole('button');
    expect(peg).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('applies interactive styling when onClick is provided and not disabled', () => {
    const handleClick = jest.fn();
    render(<Peg color={null} onClick={handleClick} />);
    const peg = screen.getByRole('button');
    expect(peg).toHaveClass('cursor-pointer');
  });
});

