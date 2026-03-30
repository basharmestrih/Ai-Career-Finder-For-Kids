import React from 'react';
import { useCareerSelections } from '../hooks/useCareerSelections';

const StepAchievement = () => {
  const { wins, setWins } = useCareerSelections();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">Share an achievement you're proud of</h3>
        <p className="text-sm text-slate-500">Describe a project or moment with a real impact.</p>
      </div>
      <textarea
        value={wins}
        onChange={(event) => setWins(event.target.value)}
        placeholder="e.g., I built an automation that saved my team 10 hours a week..."
        className="h-40 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-800 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
};

export default StepAchievement;
