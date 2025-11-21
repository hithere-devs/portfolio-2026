import React from 'react';
import { InputType } from './types';

interface TouchControlsProps {
  onInput: (input: InputType) => void;
  onDirectionStart: (direction: 'forward' | 'back' | 'up' | 'down') => void;
  onDirectionEnd: () => void;
}

export function TouchControls({ onInput, onDirectionStart, onDirectionEnd }: TouchControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4 pointer-events-none">
      {/* D-Pad */}
      <div className="relative w-32 h-32 pointer-events-auto">
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-700 bg-opacity-50 rounded"
          onTouchStart={() => onDirectionStart('up')}
          onTouchEnd={onDirectionEnd}
        >
          ↑
        </button>
        <button
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-700 bg-opacity-50 rounded"
          onTouchStart={() => onDirectionStart('down')}
          onTouchEnd={onDirectionEnd}
        >
          ↓
        </button>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-700 bg-opacity-50 rounded"
          onTouchStart={() => onDirectionStart('back')}
          onTouchEnd={onDirectionEnd}
        >
          ←
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-700 bg-opacity-50 rounded"
          onTouchStart={() => onDirectionStart('forward')}
          onTouchEnd={onDirectionEnd}
        >
          →
        </button>
      </div>

      {/* Attack buttons */}
      <div className="grid grid-cols-2 gap-2 pointer-events-auto">
        <button
          className="w-12 h-12 bg-red-600 bg-opacity-50 rounded text-white font-bold"
          onTouchStart={() => onInput('punch1')}
        >
          LP
        </button>
        <button
          className="w-12 h-12 bg-red-700 bg-opacity-50 rounded text-white font-bold"
          onTouchStart={() => onInput('punch2')}
        >
          HP
        </button>
        <button
          className="w-12 h-12 bg-blue-600 bg-opacity-50 rounded text-white font-bold"
          onTouchStart={() => onInput('kick1')}
        >
          LK
        </button>
        <button
          className="w-12 h-12 bg-blue-700 bg-opacity-50 rounded text-white font-bold"
          onTouchStart={() => onInput('kick2')}
        >
          HK
        </button>
      </div>
    </div>
  );
}
