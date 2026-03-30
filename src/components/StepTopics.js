import Chip from './Chip';
import { useCareerSelections } from '../hooks/useCareerSelections';

const topics = [
  'Software Development',
  'UI/UX Design',
  'Artificial Intelligence',
  'Cybersecurity',
  'Game Development',
  'Robotics & Engineering',
  'Digital Art & Illustration',
  'Content Creation & Media',
  'Esports & Gaming',
  'Business & Entrepreneurship',
  'Finance & Investing',
  'Marketing & Branding',
  'Data Science & Analytics',
  'Science & Research',
  'Healthcare & Medicine',
  'Education & Teaching',
  'Public Speaking & Media',
  'Event Management',
  'Music & Audio Production',
  'Writing & Storytelling'
];

const StepTopics = () => {
  const { interests: selected, toggleInterest } = useCareerSelections();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">What sparks your curiosity?</h3>
        <p className="text-sm text-slate-500">Choose a mix of industries and topics you enjoy exploring.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Chip
            key={topic}
            label={topic}
            selected={selected.includes(topic)}
            onClick={() => toggleInterest(topic)}
          />
        ))}
      </div>
    </div>
  );
};

export default StepTopics;
