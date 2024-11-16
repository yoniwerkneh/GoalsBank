import React from 'react';
import { Target } from 'lucide-react';
import { Goal } from '../types/banking';
import { formatCurrency, formatPercentage } from '../utils/format';

interface GoalPreviewProps {
  goal: Goal;
  onViewAll: () => void;
}

export default function GoalPreview({ goal, onViewAll }: GoalPreviewProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  return (
    <div className="bg-white rounded-lg p-6 border border-primary-500/20 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500/10 p-2 rounded-full">
            <Target className="w-6 h-6 text-primary-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Top Goal</h2>
        </div>
        <button 
          onClick={onViewAll}
          className="text-primary-500 hover:text-primary-400 transition-colors text-sm"
        >
          View All Goals →
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-gray-800 font-medium mb-1">{goal.name}</h3>
          <p className="text-sm text-gray-600">
            Target: {formatCurrency(goal.targetAmount)}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="text-primary-500">{formatPercentage(progress)}</span>
          </div>
          <div className="h-2 bg-background-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}