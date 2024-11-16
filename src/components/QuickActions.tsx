import React from 'react';
import { Target, LineChart, Send, Settings } from 'lucide-react';

const actions = [
  { icon: Target, label: 'Goals', action: '/goals' },
  { icon: LineChart, label: 'Financial Insights', action: '/insights' },
  { icon: Send, label: 'Transfer', action: '/transfer' },
  { icon: Settings, label: 'Settings', action: '/settings' }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map(({ icon: Icon, label, action }) => (
        <button
          key={label}
          onClick={() => window.location.href = action}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-primary-500/20 hover:bg-primary-500/5 transition-colors shadow-sm"
        >
          <div className="bg-primary-500/10 p-3 rounded-full">
            <Icon className="w-6 h-6 text-primary-500" />
          </div>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
}