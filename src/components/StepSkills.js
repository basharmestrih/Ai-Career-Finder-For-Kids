import Chip from './Chip';
import { useCareerSelections } from '../hooks/useCareerSelections';

const skills = [
  'Being Creative',
  'Thinking Clearly',
  'Solving Problems',
  'Thinking Deeply',
  'Talking Clearly',
  'Working with Others',
  'Leading Others',
  'Managing Time',
  'Staying Organized',
  'Adapting Easily',
  'Staying Focused',
  'Love Learning',
  'Paying Attention',
  'Making Decisions',
  'Understanding Feelings',
  'Being Confident',
  'Working Alone',
  'Helping Others',
  'Never Giving Up',
  'Trying New Ideas'
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
