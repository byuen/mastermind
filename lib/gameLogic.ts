import { FeedbackState } from '@/components/FeedbackPegs';

/**
 * Generates a random secret code for the Mastermind game
 * @param colors - Array of available colors
 * @param codeLength - Length of the code (default: 4)
 * @returns Array of color strings representing the secret code
 */
export function generateSecretCode(colors: string[], codeLength: number = 4): string[] {
  const code: string[] = [];
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    code.push(colors[randomIndex]);
  }
  return code;
}

/**
 * Validates a guess to ensure it meets game requirements
 * @param guess - Array of colors (or null for empty positions)
 * @param codeLength - Expected length of the code
 * @returns true if the guess is valid, false otherwise
 */
export function validateGuess(guess: (string | null)[], codeLength: number = 4): boolean {
  if (guess.length !== codeLength) {
    return false;
  }
  return guess.every((color) => color !== null);
}

/**
 * Calculates feedback for a guess compared to the secret code
 * Mastermind feedback rules:
 * - Black peg: correct color in correct position
 * - White peg: correct color in wrong position
 * - Empty: color not in code
 * 
 * @param guess - Array of color strings representing the player's guess
 * @param secretCode - Array of color strings representing the secret code
 * @returns Array of FeedbackState representing the feedback (black, white, or empty)
 */
export function calculateFeedback(guess: string[], secretCode: string[]): FeedbackState[] {
  const feedback: FeedbackState[] = [];
  const guessCopy = [...guess];
  const codeCopy = [...secretCode];
  const codeUsedIndices = new Set<number>();

  // First pass: Find exact matches (black pegs)
  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === codeCopy[i]) {
      feedback.push('black');
      guessCopy[i] = null; // Mark as used
      codeCopy[i] = null; // Mark as used
      codeUsedIndices.add(i);
    } else {
      feedback.push(null); // Placeholder for second pass
    }
  }

  // Second pass: Find color matches in wrong positions (white pegs)
  for (let i = 0; i < guessCopy.length; i++) {
    if (feedback[i] === null && guessCopy[i] !== null) {
      // Look for this color in the code (not already matched in exact position)
      const colorIndex = codeCopy.findIndex(
        (color, idx) => color === guessCopy[i] && !codeUsedIndices.has(idx) && color !== null
      );
      if (colorIndex !== -1) {
        feedback[i] = 'white';
        codeCopy[colorIndex] = null; // Mark as used
        codeUsedIndices.add(colorIndex);
      } else {
        feedback[i] = 'empty';
      }
    } else if (feedback[i] === null) {
      feedback[i] = 'empty';
    }
  }

  // Sort feedback: black first, then white, then empty (traditional Mastermind order)
  return feedback.sort((a, b) => {
    const order = { black: 0, white: 1, empty: 2 };
    return order[a] - order[b];
  });
}

/**
 * Checks if the player has won the game
 * @param feedback - Array of FeedbackState from the latest guess
 * @param codeLength - Length of the code
 * @returns true if all feedback pegs are black (all correct), false otherwise
 */
export function checkWin(feedback: FeedbackState[]): boolean {
  return feedback.length > 0 && feedback.every((peg) => peg === 'black');
}

/**
 * Checks if the player has lost the game (max attempts reached)
 * @param attemptCount - Number of attempts made
 * @param maxAttempts - Maximum number of attempts allowed
 * @returns true if max attempts reached, false otherwise
 */
export function checkLoss(attemptCount: number, maxAttempts: number = 10): boolean {
  return attemptCount >= maxAttempts;
}

