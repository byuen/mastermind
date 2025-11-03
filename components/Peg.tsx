import React from 'react';

interface PegProps {
  color: string | null;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Peg({ color, onClick, disabled = false }: PegProps) {
  const baseClasses = "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200";
  const emptyClasses = "bg-gray-100 border-gray-400";
  const filledClasses = "border-gray-600";
  const interactiveClasses = onClick && !disabled ? "cursor-pointer hover:scale-105 active:scale-95" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || !onClick}
      className={`${baseClasses} ${color ? filledClasses : emptyClasses} ${interactiveClasses} ${disabledClasses}`}
      aria-label={color ? `Peg with color ${color}` : 'Empty peg hole'}
      style={color ? { backgroundColor: color } : undefined}
    >
      {!color && <span className="text-gray-400 text-xs">○</span>}
    </button>
  );
}

