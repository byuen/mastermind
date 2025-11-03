import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ColorPalette from '../ColorPalette';

describe('ColorPalette Component', () => {
  const mockColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const mockOnColorSelect = jest.fn();

  beforeEach(() => {
    mockOnColorSelect.mockClear();
  });

  it('renders all 6 colors correctly', () => {
    render(<ColorPalette colors={mockColors} onColorSelect={mockOnColorSelect} />);
    const colorButtons = screen.getAllByRole('button');
    expect(colorButtons).toHaveLength(6);
    mockColors.forEach((color) => {
      const button = screen.getByLabelText(`Select color ${color}`);
      expect(button).toHaveStyle({ backgroundColor: color });
    });
  });

  it('calls onColorSelect when a color is clicked', () => {
    render(<ColorPalette colors={mockColors} onColorSelect={mockOnColorSelect} />);
    const firstColorButton = screen.getByLabelText(`Select color ${mockColors[0]}`);
    fireEvent.click(firstColorButton);
    expect(mockOnColorSelect).toHaveBeenCalledTimes(1);
    expect(mockOnColorSelect).toHaveBeenCalledWith(mockColors[0]);
  });

  it('shows visual feedback for selected color', () => {
    render(
      <ColorPalette
        colors={mockColors}
        onColorSelect={mockOnColorSelect}
        selectedColor={mockColors[1]}
      />
    );
    const selectedButton = screen.getByLabelText(`Select color ${mockColors[1]}`);
    expect(selectedButton).toHaveClass('scale-110');
    expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('supports keyboard navigation with Enter key', async () => {
    const user = userEvent.setup();
    render(<ColorPalette colors={mockColors} onColorSelect={mockOnColorSelect} />);
    const firstColorButton = screen.getByLabelText(`Select color ${mockColors[0]}`);
    firstColorButton.focus();
    await user.keyboard('{Enter}');
    expect(mockOnColorSelect).toHaveBeenCalledWith(mockColors[0]);
  });

  it('supports keyboard navigation with Space key', async () => {
    const user = userEvent.setup();
    render(<ColorPalette colors={mockColors} onColorSelect={mockOnColorSelect} />);
    const firstColorButton = screen.getByLabelText(`Select color ${mockColors[0]}`);
    firstColorButton.focus();
    await user.keyboard(' ');
    expect(mockOnColorSelect).toHaveBeenCalledWith(mockColors[0]);
  });

  it('has minimum 44x44px touch targets', () => {
    render(<ColorPalette colors={mockColors} onColorSelect={mockOnColorSelect} />);
    const colorButtons = screen.getAllByRole('button');
    colorButtons.forEach((button) => {
      expect(button).toHaveClass('w-12', 'h-12'); // 48x48px = 3rem = 12 in Tailwind
    });
  });
});

