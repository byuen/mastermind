import {
  generateSecretCode,
  validateGuess,
  calculateFeedback,
  checkWin,
  checkLoss,
} from '../gameLogic';
import { FeedbackState } from '@/components/FeedbackPegs';

describe('Game Logic Functions', () => {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  describe('generateSecretCode', () => {
    it('generates a code of the correct length', () => {
      const code = generateSecretCode(colors, 4);
      expect(code).toHaveLength(4);
    });

    it('generates a code using only colors from the provided array', () => {
      const code = generateSecretCode(colors, 4);
      code.forEach((color) => {
        expect(colors).toContain(color);
      });
    });

    it('generates different codes on multiple calls', () => {
      const code1 = generateSecretCode(colors, 4);
      const code2 = generateSecretCode(colors, 4);
      // There's a small chance they're the same, but very unlikely
      // We'll test multiple times to ensure randomness
      const codes = Array(10)
        .fill(null)
        .map(() => generateSecretCode(colors, 4));
      const uniqueCodes = new Set(codes.map((c) => c.join(',')));
      expect(uniqueCodes.size).toBeGreaterThan(1);
    });
  });

  describe('validateGuess', () => {
    it('returns true for a complete guess', () => {
      const guess = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      expect(validateGuess(guess, 4)).toBe(true);
    });

    it('returns false for an incomplete guess', () => {
      const guess = ['#FF0000', null, '#0000FF', '#FFFF00'];
      expect(validateGuess(guess, 4)).toBe(false);
    });

    it('returns false for a guess with wrong length', () => {
      const guess = ['#FF0000', '#00FF00'];
      expect(validateGuess(guess, 4)).toBe(false);
    });
  });

  describe('calculateFeedback', () => {
    it('returns all black pegs for exact match', () => {
      const guess = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      const code = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      const feedback = calculateFeedback(guess, code);
      expect(feedback).toEqual(['black', 'black', 'black', 'black']);
    });

    it('returns all empty for completely wrong guess', () => {
      const guess = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      const code = ['#FF00FF', '#00FFFF', '#FF00FF', '#00FFFF'];
      const feedback = calculateFeedback(guess, code);
      expect(feedback).toEqual(['empty', 'empty', 'empty', 'empty']);
    });

    it('returns white pegs for correct colors in wrong positions', () => {
      const guess = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      const code = ['#00FF00', '#FF0000', '#FFFF00', '#0000FF'];
      const feedback = calculateFeedback(guess, code);
      expect(feedback.filter((f) => f === 'white')).toHaveLength(4);
      expect(feedback.filter((f) => f === 'black')).toHaveLength(0);
    });

    it('returns correct mix of black and white pegs', () => {
      const guess = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      const code = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00'];
      const feedback = calculateFeedback(guess, code);
      expect(feedback.filter((f) => f === 'black')).toHaveLength(2); // Positions 0 and 3
      expect(feedback.filter((f) => f === 'white')).toHaveLength(2); // Positions 1 and 2
    });

    it('handles duplicate colors correctly', () => {
      const guess = ['#FF0000', '#FF0000', '#00FF00', '#0000FF'];
      const code = ['#FF0000', '#0000FF', '#FF0000', '#00FF00'];
      const feedback = calculateFeedback(guess, code);
      // Position 0: exact match (black)
      // Position 1: #FF0000 matches code[2] (white)
      // Position 2: #00FF00 matches code[3] (white)
      // Position 3: #0000FF matches code[1] (white)
      expect(feedback.filter((f) => f === 'black')).toHaveLength(1); // Only first position matches exactly
      expect(feedback.filter((f) => f === 'white')).toHaveLength(3); // Three colors match but in wrong positions
    });

    it('sorts feedback: black first, then white, then empty', () => {
      const guess = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      const code = ['#FF0000', '#FFFF00', '#FF00FF', '#00FFFF'];
      const feedback = calculateFeedback(guess, code);
      // Should have 1 black, 1 white, 2 empty
      expect(feedback[0]).toBe('black');
      expect(feedback[1]).toBe('white');
      expect(feedback[2]).toBe('empty');
      expect(feedback[3]).toBe('empty');
    });
  });

  describe('checkWin', () => {
    it('returns true when all pegs are black', () => {
      const feedback: FeedbackState[] = ['black', 'black', 'black', 'black'];
      expect(checkWin(feedback)).toBe(true);
    });

    it('returns false when not all pegs are black', () => {
      const feedback: FeedbackState[] = ['black', 'black', 'white', 'empty'];
      expect(checkWin(feedback)).toBe(false);
    });
  });

  describe('checkLoss', () => {
    it('returns true when attempt count reaches max', () => {
      expect(checkLoss(10, 10)).toBe(true);
      expect(checkLoss(11, 10)).toBe(true);
    });

    it('returns false when attempt count is below max', () => {
      expect(checkLoss(9, 10)).toBe(false);
      expect(checkLoss(5, 10)).toBe(false);
    });
  });
});

