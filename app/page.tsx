'use client';

import GameBoard from '@/components/GameBoard';
import { GameBoardProvider } from '@/contexts/GameBoardContext';

const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

export default function Home() {
  return (
    <GameBoardProvider colors={COLORS}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <GameBoard />
      </div>
    </GameBoardProvider>
  );
}

