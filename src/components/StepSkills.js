import Chip from './Chip';
import { useCareerSelections } from '../hooks/useCareerSelections';

const skills = [
  "Be Creative",
  "Clear Thinking",
  "Solve Problems",
  "Think Deep",
  "Speak Clearly",
  "Team Work",
  "Lead Others",
  "Manage Time",
  "Stay Organized",
  "Be Flexible",
  "Stay Focused",
  "Love Learning",
  "Pay Attention",
  "Make Choices",
  "Understand Feelings",
  "Be Confident",
  "Work Alone",
  "Help Others",
  "Keep Trying",
  "Try New Things"
];


const StepSkills = () => {
  const { skills: selected, toggleSkill } = useCareerSelections();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">What are you great at?</h3>
        <p className="text-sm text-slate-500">Select up to five technical or soft skills you enjoy using.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            selected={selected.includes(skill)}
            onClick={() => toggleSkill(skill)}
          />
        ))}
      </div>
    </div>
  );
};

export default StepSkills;
