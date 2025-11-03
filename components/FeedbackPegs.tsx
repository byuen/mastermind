import React from 'react';

export type FeedbackState = 'black' | 'white' | 'empty';

interface FeedbackPegsProps {
  feedback: FeedbackState[];
}

export default function FeedbackPegs({ feedback }: FeedbackPegsProps) {
  const getFeedbackColor = (state: FeedbackState): string => {
    switch (state) {
      case 'black':
        return 'bg-black';
      case 'white':
        return 'bg-white border-gray-400';
      case 'empty':
        return 'bg-gray-100 border-gray-300';
      default:
        return 'bg-gray-100';
    }
  };

  const getAriaLabel = (state: FeedbackState): string => {
    switch (state) {
      case 'black':
        return 'Correct color in correct position';
      case 'white':
        return 'Correct color in wrong position';
      case 'empty':
        return 'Color not in code';
      default:
        return 'Feedback peg';
    }
  };

  return (
    <div className="flex gap-1" role="group" aria-label="Feedback pegs">
      {feedback.map((state, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full border border-gray-400 ${getFeedbackColor(state)}`}
          aria-label={getAriaLabel(state)}
          role="img"
        />
      ))}
    </div>
  );
}

