import { useCareerSelections } from '../hooks/useCareerSelections';

const StepEducation = () => {
  const { education: choice, setEducation } = useCareerSelections();
  const levels = [
    "Elementary School Student",
    "Middle School Student",
    "High School Student",
    "Undergraduate Student",
    "Bachelor's Degree Graduate",
    "Master's Degree Graduate",
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">Pick your education level</h3>
        <p className="text-sm text-slate-500">Choose the option that best matches where you are in your learning journey.</p>
      </div>
      <div className="space-y-3">
        {levels.map((level) => (
          <label
            key={level}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
              choice === level
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
            }`}
          >
            <input
              type="radio"
              name="education"
              value={level}
              checked={choice === level}
              onChange={() => setEducation(level)}
              className="h-4 w-4 accent-indigo-600"
            />
            <span className="font-semibold">{level}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StepEducation;
